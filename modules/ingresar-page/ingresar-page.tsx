'use client';

import React from 'react';
import { useRouter as useNavigation } from 'next/navigation';
import { AccountStatus, User, VerificationPurpose } from '@prisma/client';
import {
  IconAlertCircle,
  IconArrowLeft,
  IconArrowRight,
  IconCircleCheck,
  IconExclamationCircle,
  IconInfoCircle,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import {
  Alert,
  AlertProps,
  Anchor,
  Box,
  Button,
  Container,
  Flex,
  Group,
  NumberInput,
  Paper,
  PinInput,
  rem,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { SendVerificationCodeResponse } from '@/app/api/phones/[phone]/verification-code/route';
import { api } from '@/lib/api';
import classes from './ingresar-page.module.css';

const ErrorMessages: Record<string, string> = {
  CredentialsSignin: 'Credenciales incorrectas. Verifica tu documento y pin e intenta de nuevo.',
};

enum Page {
  Document,
  Pin,
  Phone,
  VerifyPhone,
  CreatePin,
  Success,
}

enum Direction {
  Next = 'next',
  Back = 'back',
}

const variants = {
  enter: (d: Direction) => ({ x: d === Direction.Next ? 100 : -100, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (d: Direction) => ({ zIndex: 0, x: d === Direction.Next ? 100 : -100, opacity: 0 }),
};

class ErrorUserNotFound extends Error {
  constructor() {
    super('User not found');
    this.name = 'ErrorUserNotFound';
  }
}

enum AlertType {
  Success,
  Error,
  Warning,
  Info,
}

export function IngresarPage() {
  const navigation = useNavigation();

  const [[page, direction], setPage] = React.useState<[Page, Direction]>([
    Page.Document,
    Direction.Next,
  ]);

  const [clock, setClock] = React.useState<string>('');

  const [isLoading, setIsLoading] = React.useState(false);

  const [document, setDocument] = React.useState('');
  const [phone, setPhone] = React.useState<number | undefined>();
  const [code, setCode] = React.useState('');
  const [registerPin, setRegisterPin] = React.useState('');
  const [signInPin, setSignInPin] = React.useState('');
  const [verificationPurpose, setVerificationPurpose] = React.useState<VerificationPurpose>(
    VerificationPurpose.REGISTRATION
  );

  const [waitUntilTime, setWaitUntilTime] = React.useState<Date | null>(null);
  const [tryAgainCountDown, setTryAgainCountDown] = React.useState<string>('');
  const [codeExpireDate, setCodeExpireDate] = React.useState<Date | null>(null);

  const [alert, setAlert] = React.useState<{
    type: AlertType;
    title: string;
    message: string;
  } | null>(null);

  const motionDivProps: React.ComponentProps<typeof motion.div> = {
    custom: direction,
    variants,
    initial: 'enter',
    animate: 'center',
    exit: 'exit',
    style: { position: 'absolute', width: '100%', top: page === Page.Document ? 0 : '50px' },
    layout: true,
  };

  const validateUser = React.useCallback(
    () =>
      new Promise<User>((resolve, reject) => {
        document
          ? api
              .get<{ user: User }>(`/users/${document}`)
              .then(({ data }) => {
                if (!data.user) reject(new ErrorUserNotFound());
                resolve(data.user);
              })
              .catch(() => reject(new ErrorUserNotFound()))
          : reject();
      }),
    [document]
  );

  const assignPhone = React.useCallback(
    () =>
      new Promise<void>((resolve, reject) => {
        if (phone) {
          api
            .patch<void>(`/users/${document}`, { phone })
            .then(() => resolve())
            .catch(() => reject());
        } else {
          reject();
        }
      }),
    [document, phone]
  );

  const validatePhone = React.useCallback(
    () =>
      new Promise<void>((resolve, reject) => {
        if (phone) {
          api
            .get<{ phone: number }>(`/phones/${phone}`)
            .then(() => reject()) // Phone taken already
            .catch(() => resolve());
        } else {
          reject();
        }
      }),
    [phone]
  );

  const sendVerificationCode = React.useCallback(
    (purpose?: VerificationPurpose) =>
      new Promise<void>((resolve, reject) => {
        let url = `/phones/${phone}/verification-code`;

        const verPurpose = purpose || verificationPurpose;

        if (verPurpose === VerificationPurpose.PIN_RECOVERY) {
          url = `/users/${document}/pin/recovery`;
        }

        api
          .post<SendVerificationCodeResponse>(
            url,
            { purpose: verPurpose },
            { validateStatus: (status) => status === 429 || (status >= 200 && status < 300) }
          )
          .then(({ data, status }) => {
            if ('error' in data) {
              if (status === 429 && data.error.details) {
                setWaitUntilTime(new Date(data.error.details.tryAgainAt));
                setCodeExpireDate(new Date(data.error.details.lastVerification.expiresAt));
              }
            } else {
              setWaitUntilTime(new Date(data.data.tryAgainAt));
              setCodeExpireDate(new Date(data.data.expiresAt));
            }
            resolve();
          })
          .catch(() => reject());
      }),
    [phone, verificationPurpose, document]
  );

  const createUser = React.useCallback(
    () =>
      new Promise<User>((resolve, reject) => {
        api
          .post<{ user: User }>(`/users/${document}`)
          .then(({ data }) => resolve(data.user))
          .catch(() => reject());
      }),
    [document]
  );

  const validateCode = React.useCallback(
    () =>
      new Promise<void>((resolve, reject) => {
        api
          .post<{ code: string }>(`/phones/${phone}/verification-code/verify`, {
            code,
            nationalId: document,
          })
          .then(() => resolve())
          .catch(() => reject());
      }),
    [phone, code]
  );

  const trySignIn = React.useCallback(() => {
    setAlert(null);
    signIn('credentials', { nationalId: document, pin: signInPin, redirect: false })
      .then((response) => {
        if (!response) {
          setAlert({
            type: AlertType.Error,
            title: 'Error',
            message: 'Nos e que paso manito',
          });
        } else if (response.error) {
          setAlert({
            type: AlertType.Error,
            title: 'Error',
            message: ErrorMessages[response.error],
          });
        } else {
          navigation.replace('/plaza');
        }
      })
      .catch((r) => console.log(r))
      .finally(() => setIsLoading(false));
  }, [document, signInPin]);

  const setUserPin = () =>
    new Promise<void>((resolve, reject) => {
      api
        .put<void>(`/users/${document}/pin`, { pin: registerPin })
        .then(() => resolve())
        .catch(() => reject());
    });

  const nextButtonText = React.useMemo(
    () =>
      ({
        [Page.Document]: 'Continuar',
        [Page.Pin]: 'Continuar',
        [Page.Phone]: 'Continuar',
        [Page.VerifyPhone]: 'Verificar',
        [Page.CreatePin]: 'Continuar',
        [Page.Success]: 'Ingresar',
      })[page],
    [page]
  );

  const nextButtonAction = React.useCallback(() => {
    (
      ({
        [Page.Document]() {
          setIsLoading(true);
          validateUser()
            .then((user) =>
              user.accountStatus === AccountStatus.ACTIVE
                ? setPage([Page.Pin, Direction.Next])
                : setPage([Page.Phone, Direction.Next])
            )
            .catch(() =>
              createUser().then(() => {
                setPage([Page.Phone, Direction.Next]);
                setVerificationPurpose(VerificationPurpose.REGISTRATION);
              })
            );
        },
        [Page.CreatePin]() {
          setIsLoading(true);
          setUserPin()
            .then(() => signIn('credentials', { nationalId: document, pin: registerPin }))
            .catch(() => window.alert('Error setting pin. Try again'));
        },
        [Page.Phone]() {
          setIsLoading(true);
          validatePhone()
            .then(() => {
              assignPhone().then(() =>
                sendVerificationCode()
                  .then(() => setPage([Page.VerifyPhone, Direction.Next]))
                  .catch(() => {
                    window.alert('Error sending verification code');
                    setIsLoading(false);
                  })
              );
            })
            .catch(() => window.alert('Phone already taken'));
        },
        [Page.VerifyPhone]() {
          setIsLoading(true);

          const now = new Date();

          if (codeExpireDate && now > codeExpireDate) {
            if (waitUntilTime && now < waitUntilTime) {
              sendVerificationCode().then(() => {
                window.alert('El código anterior ha expirado. Hemos enviado un nuevo código.');
                setIsLoading(false);
              });
            } else {
              window.alert('El código ha expirado. Intenta de nuevo más tarde.');
              setIsLoading(false);
            }
          } else {
            validateCode()
              .then(() => setPage([Page.CreatePin, Direction.Next]))
              .catch(() => {
                window.alert('Invalid code');
                setIsLoading(false);
              });
          }
        },
        [Page.Success]() {
          setPage([Page.Document, Direction.Next]);
        },
        [Page.Pin]() {
          setIsLoading(true);
          trySignIn();
        },
      }) as Record<Page, () => void>
    )[page]();
  }, [
    page,
    validateUser,
    sendVerificationCode,
    setUserPin,
    validateCode,
    validatePhone,
    assignPhone,
    trySignIn,
  ]);

  const backButtonAction = React.useCallback(() => {
    setPage([Page.Document, Direction.Back]);
  }, [page]);

  React.useEffect(() => {
    setAlert(null);
    setIsLoading(false);
  }, [page]);

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (waitUntilTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = waitUntilTime.getTime() - now.getTime();
        if (diff > 0) {
          setTryAgainCountDown(
            new Date(diff).toISOString().slice(11, 19).replace(/^00:/, '').replace(/^0/, '')
          );
        } else {
          setWaitUntilTime(null);
          clearInterval(interval);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [waitUntilTime]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      setClock(`${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container size={460} my={30}>
      {clock}
      <Title className={classes.title} ta="center">
        Ingresar a Mercado Agro
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Ingresa tu numero de documento de identidad para continuar
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        mt="xl"
        h={rem(450)}
        style={{ overflow: 'hidden' }}
      >
        <Box
          style={{
            display: 'grid',
            gridTemplateRows: '1fr auto auto',
            gridTemplateColumns: '1fr',
            gap: '1rem',
          }}
          h="100%"
        >
          <Box pos="relative">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                {...motionDivProps}
                key="back"
                style={{ position: 'absolute', width: '100%' }}
              >
                <Box>
                  {page !== Page.Document && (
                    <Button
                      leftSection={<IconArrowLeft size={18} />}
                      variant="subtle"
                      size="compact-md"
                      onClick={() => {
                        backButtonAction();
                      }}
                    >
                      Volver
                    </Button>
                  )}
                </Box>
              </motion.div>
              <motion.div {...motionDivProps} key={page}>
                <Stack>
                  {
                    (
                      {
                        [Page.Document]: (
                          <TextInput
                            label="Documento"
                            placeholder="1234567890"
                            required
                            minLength={6}
                            maxLength={20}
                            value={document}
                            onChange={(event) => setDocument(event.currentTarget.value)}
                            readOnly={isLoading}
                          />
                        ),
                        [Page.Pin]: (
                          <>
                            <Text size="lg">
                              Hola, <strong>Carlos</strong>!
                            </Text>
                            <Text>Ingresa tu pin para continuar.</Text>
                            <Flex align="center" direction="column" gap="sm">
                              <PinInput
                                length={4}
                                type="number"
                                value={signInPin}
                                onChange={(value) => {
                                  setAlert(null);
                                  setSignInPin(value);
                                }}
                                error={alert?.type === AlertType.Error}
                                readOnly={isLoading}
                              />
                              <Text size="sm">
                                ¿Olvidaste tu pin?{' '}
                                <Anchor
                                  onClick={() => {
                                    setIsLoading(true);
                                    setVerificationPurpose(VerificationPurpose.PIN_RECOVERY);
                                    sendVerificationCode(VerificationPurpose.PIN_RECOVERY).then(
                                      () => {
                                        setPage([Page.VerifyPhone, Direction.Next]);
                                      }
                                    );
                                  }}
                                >
                                  Recuperar
                                </Anchor>
                              </Text>
                            </Flex>
                          </>
                        ),
                        [Page.Phone]: (
                          <>
                            <Text>
                              Para continuar con el registro, necesitamos tu número de teléfono para
                              verificar tu identidad.
                            </Text>
                            <NumberInput
                              type="tel"
                              label="Teléfono"
                              required
                              minLength={10}
                              maxLength={12}
                              hideControls
                              value={phone}
                              onChange={(value) => {
                                setPhone(value as number);
                              }}
                            />
                          </>
                        ),
                        [Page.VerifyPhone]: (
                          <>
                            <Text>
                              Ingresa el código de verificación que enviamos a tu número de teléfono
                            </Text>
                            <Flex align="center" direction="column" gap="sm">
                              <PinInput length={6} type="number" value={code} onChange={setCode} />
                              <Group wrap="nowrap">
                                <Text size="sm">
                                  ¿No has recibido el mensaje de texto?{' '}
                                  {waitUntilTime ? (
                                    <>
                                      Vuelve a intentarlo en{' '}
                                      <Text fw="bold" span style={{ cursor: 'not-allowed' }}>
                                        {tryAgainCountDown}
                                      </Text>
                                    </>
                                  ) : null}
                                </Text>
                                <Button
                                  disabled={!!waitUntilTime}
                                  size="compact-md"
                                  style={{ flexShrink: 0 }}
                                  onClick={() => {
                                    sendVerificationCode().catch(() => {
                                      window.alert('Error sending verification code');
                                    });
                                  }}
                                >
                                  Reenviar
                                </Button>
                              </Group>
                            </Flex>
                          </>
                        ),
                        [Page.CreatePin]: (
                          <>
                            <Text>Crea un pin de 4 dígitos para continuar</Text>
                            <Flex align="center" direction="column" gap="sm">
                              <PinInput
                                length={4}
                                type="number"
                                value={registerPin}
                                onChange={setRegisterPin}
                              />
                            </Flex>
                          </>
                        ),
                        [Page.Success]: (
                          <>
                            <Text>¡Tu cuenta ha sido creada exitosamente!</Text>
                          </>
                        ),
                      } as Record<Page, React.ReactNode>
                    )[page]
                  }
                </Stack>
              </motion.div>
            </AnimatePresence>
          </Box>
          <Box>
            {alert ? (
              <Alert
                color={
                  (
                    {
                      [AlertType.Info]: 'blue',
                      [AlertType.Success]: 'green',
                      [AlertType.Error]: 'red',
                      [AlertType.Warning]: 'orange',
                    } as Record<AlertType, AlertProps['color']>
                  )[alert.type] || 'blue'
                }
                icon={
                  (
                    {
                      [AlertType.Info]: <IconInfoCircle />,
                      [AlertType.Success]: <IconCircleCheck />,
                      [AlertType.Error]: <IconExclamationCircle />,
                      [AlertType.Warning]: <IconAlertCircle />,
                    } as Record<AlertType, React.ReactNode>
                  )[alert.type] || <IconInfoCircle />
                }
                title={alert.title}
                withCloseButton
                onClose={() => setAlert(null)}
              >
                {alert.message}
              </Alert>
            ) : null}
          </Box>
          <Group w="100%" wrap="nowrap">
            <Button
              rightSection={<IconArrowRight size={16} />}
              style={{ width: '100%' }}
              onClick={() => {
                nextButtonAction();
              }}
              loading={isLoading}
            >
              {nextButtonText}
            </Button>
          </Group>
        </Box>
      </Paper>
    </Container>
  );
}