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
  LoadingOverlay
} from '@mantine/core';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from './MainScreen';
import { Preferences } from '@capacitor/preferences';
import config from '../config';
import axios from 'axios';

export default function MainPage() {

  const date = new Date()
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [loading, SetLoading] = useState(true)

  const user = JSON.parse(localStorage.getItem('user'))

  const [screen, setScreen] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {getSelf()}, [])

  // set object
  async function setObject(key, object) {
    await Preferences.set({
        key: key,
        value: JSON.stringify(object),
    })
        .then((res) => {
            console.log({ res: res, msg: `Saved object succesfully` });
            localStorage.setItem(key, JSON.stringify(object));
            // navigate('/mainpage')
        })
        .catch((err) => console.log(err));
  }

  function getSelf() {
    axios
      .get(`${config.backendLocation}/user/self`, {headers: {token : localStorage.getItem('token')}})
      .then(res => {
        console.log(res.data)
        // localStorage.setItem('user', JSON.stringify(res.data))
        setObject('user', res.data)
        // navigate('/mainpage')
        SetLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // clear storage
  async function clearStorage() {
    const ret = await Preferences.clear()
      .then((res) => {
      console.log({ res: res, msg: `Cleared Storage succesfully` });
      localStorage.clear();
      navigate('/')
      })
      .catch((err) => console.log(err));
  }

  function logout() {
    clearStorage()
    // localStorage.clear()
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
          <LoadingOverlay visible={loading} overlayBlur={2} transitionDuration={100}/>
          <MainScreen screen={screen} />  
      </AppShell>
  );
}

const style = {
    navbarSection: {
        width: "100%", display: "flex", justifyContent: "flex-start"
    }
}