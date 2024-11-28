'use client';

import React, { useState, useEffect } from 'react';
import {
    IconBuildingStore,
    IconChevronDown,
    IconLogout,
} from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import {
    Avatar,
    Burger,
    Button,
    Container,
    Group,
    Menu,
    rem,
    Tabs,
    Text,
    UnstyledButton,
    useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import classes from './header.module.css';
import {VerificationPurpose} from "@prisma/client";
import { api } from '@/lib/api';
import {SendVerificationCodeResponse} from "@/app/api/phones/[phone]/verification-code/route";

const tabs = ['Granos', 'Frutas', 'Verduras', 'Tubérculos'];
// ejemplo de uso de useCallback peticion a api
// const sendVerificationCode = React.useCallback(
//     (purpose?: VerificationPurpose) =>
//         new Promise<void>((resolve, reject) => {
//             let url = `/phones/${phone}/verification-code`;
//
//             const verPurpose = purpose || verificationPurpose;
//
//             if (verPurpose === VerificationPurpose.PIN_RECOVERY) {
//                 url = `/users/${document}/pin/recovery`;
//             }
//
//             api
//                 .post<SendVerificationCodeResponse>(
//                     url,
//                     { purpose: verPurpose },
//                     { validateStatus: (status) => status === 429 || (status >= 200 && status < 300) }
//                 )
//                 .then(({ data, status }) => {
//                     if ('error' in data) {
//                         if (status === 429 && data.error.details) {
//                             setWaitUntilTime(new Date(data.error.details.tryAgainAt));
//                             setCodeExpireDate(new Date(data.error.details.lastVerification.expiresAt));
//                         }
//                     } else {
//                         setWaitUntilTime(new Date(data.data.tryAgainAt));
//                         setCodeExpireDate(new Date(data.data.expiresAt));
//                     }
//                     resolve();
//                 })
//                 .catch(() => reject());
//         }),
//     [phone, verificationPurpose, document]
// );

export const Header = () => {
    // consultar a api las categorias /categories
    //mestructura db create table "Category"
    // (
    //     id         serial
    //         primary key,
    //     name       text not null,
    //     "parentId" integer
    //                     references "Category"
    //                         on update cascade on delete set null
    // );
    //
    // alter table "Category"
    //     owner to mercadoagro_owner;

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useMantineTheme();
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    useEffect(() => {
        api.get('/categories').then(({ data }) => {
            setCategories(data.categories);
            setLoading(false);
        }).catch((error) => {
            setError(error);
            setLoading(false);
        });
    }, []);

    // Determine screen size
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm - 1}px)`);

    const items = tabs.map((tab) => (
        <Tabs.Tab value={tab} key={tab}>
            {tab}
        </Tabs.Tab>
    ));

    return (
        <div className={classes.header}>
            <Container className={classes.mainSection} size="md">
                <Group position="apart" align="center">
                    {/* Logo */}
                    <Group align="center">
                        <IconBuildingStore size={28} />
                        <Text size="lg" fw="bold">
                            Mercado Agro
                        </Text>
                    </Group>

                    {/* Menú de usuario y burger */}
                    <Group align="center">
                        <Menu
                            width={200}
                            position="bottom-end"
                            transitionProps={{ transition: 'pop-top-right' }}
                            onClose={() => setUserMenuOpened(false)}
                            onOpen={() => setUserMenuOpened(true)}
                            withinPortal
                        >
                            <Menu.Target>
                                <UnstyledButton>
                                    <Group spacing={8}>
                                        <Avatar
                                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                                            radius="xl"
                                            size={30}
                                        />
                                        <IconChevronDown size={rem(16)} />
                                    </Group>
                                </UnstyledButton>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item
                                    icon={<IconLogout size={rem(16)} stroke={1.5} />}
                                    onClick={() => signOut()}
                                >
                                    Cerrar sesión
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>

                        {/* Burger for mobile */}
                        {isMobile && (
                            <Burger opened={opened} onClick={toggle} size="sm" />
                        )}
                    </Group>
                </Group>
            </Container>

            {/* Tabs */}
            <Container size="md">
                {/* Show Tabs differently based on screen size */}
                {isMobile ? (
                    opened && (
                        <Tabs
                            defaultValue="Granos"
                            variant="outline"
                            orientation="vertical"
                            classNames={{
                                root: classes.tabs,
                                list: classes.tabsList,
                                tab: classes.tab,
                            }}
                        >
                            <Tabs.List>{items}</Tabs.List>
                        </Tabs>
                    )
                ) : (
                    <Tabs
                        defaultValue="Granos"
                        variant="outline"
                        classNames={{
                            root: classes.tabs,
                            list: classes.tabsList,
                            tab: classes.tab,
                        }}
                    >
                        <Tabs.List>{items}</Tabs.List>
                    </Tabs>
                )}
            </Container>
        </div>
    );
};
