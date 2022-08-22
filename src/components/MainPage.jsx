import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
} from '@mantine/core';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from './MainScreen';

export default function MainPage() {

  const date = new Date()
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'))

  const [screen, setScreen] = useState(0)

  const navigate = useNavigate()

  function logout() {
    localStorage.clear()
    navigate('/')
  }

  // useEffect(() => {console.log(screen)}, [screen])

  return (
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <Navbar.Section onClick={() => {
              setScreen(0)
              setOpened(false)
            }}>
              <div style={{paddingTop: 20}} >
                  <Button variant="subtle" color="dark" style={style.navbarSection}>
                      <Text size="lg" weight={300}>My Lists</Text>
                  </Button>
              </div>
            </Navbar.Section>
            <Navbar.Section onClick={() => {
              setScreen(1)
              setOpened(false)
            }}>
              <div style={{paddingTop: 20}}>
                  <Button variant="subtle" color="dark" style={style.navbarSection}>
                      <Text size="lg" weight={300}>My Family</Text>
                  </Button>
              </div>
            </Navbar.Section>
            <Navbar.Section onClick={() => {
              setScreen(2)
              setOpened(false)
            }}>
              <div style={{paddingTop: 20}} >
                  <Button variant="subtle" color="dark" style={style.navbarSection}>
                      <Text size="lg" weight={300}>My Profile</Text>
                  </Button>
              </div>
            </Navbar.Section>
            <Navbar.Section onClick={() => logout()}>
              <div style={{paddingTop: 20}}>
                  <Button variant="subtle" color="dark" style={style.navbarSection}>
                      <Text size="lg" weight={300}>Logout</Text>
                  </Button>
              </div>
            </Navbar.Section>
          </Navbar>
        }
        footer={
          <Footer height={60} p="md">
            <Text size={'sm'}>Developed by Arunim Chakraborty</Text>
          </Footer>
        }
        header={
          <Header height={70} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Text>Welcome {JSON.parse(localStorage.getItem('user')).firstName}</Text>
            </div>
          </Header>
        }
      >
        <MainScreen screen={screen} />
      </AppShell>
  );
}

const style = {
    navbarSection: {
        width: "100%", display: "flex", justifyContent: "flex-start"
    }
}