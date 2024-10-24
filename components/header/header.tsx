'use client';

import { useState } from 'react';
import {
  IconBuildingStore,
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconSettings,
  IconStar,
} from '@tabler/icons-react';
import cx from 'clsx';
import { signOut } from 'next-auth/react';
import {
  Avatar,
  Burger,
  Container,
  Group,
  Menu,
  rem,
  Tabs,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './header.module.css';

const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};

const tabs = [
  'Mercado',
  'Orders',
  'Education',
  'Community',
  'Forums',
  'Support',
  'Account',
  'Helpdesk',
];

export const Header = () => {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <Group>
            <IconBuildingStore />
            <Text size="lg" fw="bold">
              Mercado Agro
            </Text>
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group gap={7}>
                  <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user.name}
                  </Text>
                  <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconHeart
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                Favoritos
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconStar
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
              >
                Guardados
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconMessage
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Tus comentarios
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Configuración de cuenta
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={
                  <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
                onClick={() => signOut()}
              >
                Cerrar sesión
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container size="md">
        <Tabs
          defaultValue="Mercado"
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
};
