// @ts-nocheck
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
import { VerificationPurpose } from "@prisma/client";
import { api } from '@/lib/api';
import { SendVerificationCodeResponse } from "@/app/api/phones/[phone]/verification-code/route";

import { useRouter } from 'next/navigation';

const tabs = [
    { label: 'Todos', url: '/plaza' },
    { label: 'Granos', url: '/plaza/granos' },
    { label: 'Frutas', url: '/plaza/frutas' },
    { label: 'Verduras', url: '/plaza/verduras' },
    { label: 'Tubérculos', url: '/plaza/tuberculos' },
  ];

export const Header = () => {

    const getCurrenByPath = () => {
        const path = window.location.pathname;
        const currentTab = tabs.find((tab) => tab.url === path);
        return currentTab ? currentTab.label : 'Todos';
    };

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useMantineTheme();
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        api.get('/categories').then(({ data }) => {
            console.log('categories', data);

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
        <Tabs.Tab
            value={tab.label} // Usar `tab.url` como valor único
            key={tab.label} // Usar `tab.label` como clave única
            onClick={() => push(tab.url)} // Navegar al `url` definido en el objeto
        >
            {tab.label}
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
                            <Button
                                className={classes.userButton}
                                onClick={() => push('/vender')}
                                variant="link"
                                color="green"
                                size={'sm'}
                            >
                                Vender producto
                            </Button>
                            <Button
                                className={classes.userButton}
                                onClick={() => signOut()}
                                variant="link"
                                color="gray"
                                size={'sm'}
                            >
                                Cerrar sesión
                            </Button>
                            {/*<Menu.Dropdown>*/}
                            {/*    <Menu.Item*/}
                            {/*        icon={<IconLogout size={rem(16)} stroke={1.5} />}*/}
                            {/*        onClick={() => signOut()}*/}
                            {/*    >*/}
                            {/*        Cerrar sesión*/}
                            {/*    </Menu.Item>*/}
                            {/*</Menu.Dropdown>*/}

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
                        defaultValue="Todos"
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
