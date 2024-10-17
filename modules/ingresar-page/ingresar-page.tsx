'use client';

import React from 'react';
import { User } from '@prisma/client';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
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
import { api } from '@/lib/api';
import classes from './ingresar-page.module.css';

enum Page {
  Document = 'document',
  Pin = 'pin',
  Phone = 'phone',
  VerifyPhone = 'verify_phone',
  CreatePin = 'create_pin',
  Success = 'success',
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

export function IngresarPage() {
  const [[page, direction], setPage] = React.useState<[Page, Direction]>([
    Page.Document,
    Direction.Next,
  ]);

  const [isLoading, setIsLoading] = React.useState(false);

  const [document, setDocument] = React.useState('');
  const [phone, setPhone] = React.useState<number | undefined>();

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
      new Promise<void>((resolve, reject) => {
        if (document) {
          api
            .get<{ user: User }>(`/users/${document}`)
            .then(() => resolve())
            .catch(() => reject());
        } else {
          reject();
        }
      }),
    [document]
  );

  // const validatePhone = React.useCallback(
  //   () =>
  //     new Promise<void>((resolve, reject) => {
  //       console.log(phone);
  //       if (phone) {
  //         api
  //           .get<{ phone: number }>(`/phones/${phone}`)
  //           .then(() => reject()) // Phone taken already
  //           .catch(() => resolve());
  //       } else {
  //         reject();
  //       }
  //     }),
  //   [phone]
  // );

  const validatePhone = () =>
    new Promise<void>((resolve, reject) => {
      console.log(phone);
      if (phone) {
        api
          .get<{ phone: number }>(`/phones/${phone}`)
          .then(() => reject()) // Phone taken already
          .catch(() => resolve());
      } else {
        reject();
      }
    });

  const sendVerificationCode = React.useCallback(
    () =>
      new Promise<void>((resolve, reject) => {
        api
          .post<{ user: User }>(`/users/${document}`, { phoneNumber: phone })
          .then(() => {
            api
              .post<{ message: string }>(`/phones/${phone}/verification-code`)
              .then(() => resolve())
              .catch(() => reject());
          })
          .catch(() => reject());
      }),
    [phone]
  );

  const nextButtonAction = React.useCallback(() => {
    (
      ({
        document() {
          setIsLoading(true);
          validateUser()
            .then(() => setPage([Page.Pin, Direction.Next]))
            .catch(() => setPage([Page.Phone, Direction.Next]));
        },
        // pin() {
        //   return validatePin.then(() => login()).catch(() => reEnterPin());
        // },
        phone() {
          setIsLoading(true);
          validatePhone()
            .then(() => {
              console.log('sendVerificationCode');
              sendVerificationCode().then(() => setPage([Page.VerifyPhone, Direction.Next]));
            })
            .catch(() => {}); // Re enter phone
        },
        // verify_phone() {
        //   return validateCode
        //     .then(() => setPage([Page.CreatePin, Direction.Next]))
        //     .catch(() => reEnterCode());
        // },
        // create_pin() {
        //   return validatePin
        //     .then(() => setPage([Page.Success, Direction.Next]))
        //     .catch(() => reEnterPin());
        // },
      }) as Record<Page, () => void>
    )[page]();
  }, [page, validateUser, sendVerificationCode]);

  const backButtonAction = React.useCallback(() => {
    setPage([Page.Document, Direction.Back]);
  }, [page]);

  React.useEffect(() => {
    setIsLoading(false);
  }, [page]);

  return (
    <Container size={460} my={30}>
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
          style={{ display: 'grid', gridTemplateRows: '1fr auto', gridTemplateColumns: '1fr' }}
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
                          />
                        ),
                        [Page.Pin]: (
                          <>
                            <Text size="lg">
                              Hola, <strong>Carlos</strong>!
                            </Text>
                            <Text>Ingresa tu pin para continuar.</Text>
                            <Flex align="center" direction="column" gap="sm">
                              <PinInput length={6} type="number" />
                              <Text size="sm">
                                ¿Olvidaste tu pin? <Anchor>Recuperar</Anchor>
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
                              <PinInput length={6} type="number" />
                              <Text size="sm">
                                No has recibido el código? <Anchor>Reenviar (59)</Anchor>
                              </Text>
                            </Flex>
                          </>
                        ),
                      } as Record<Page, React.ReactNode>
                    )[page]
                  }
                </Stack>
              </motion.div>
            </AnimatePresence>
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
              Continuar
            </Button>
          </Group>
        </Box>
      </Paper>
    </Container>
  );
}
