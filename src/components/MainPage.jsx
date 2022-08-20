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
import ShoppingLists from './MainPage/ShoppingLists';
import axios from 'axios';
import config from '../config';
import { useEffect } from 'react';

export default function MainPage({name}) {

  const date = new Date()
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user)

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
          <Navbar.Section>
            <div style={{paddingTop: 20}}>
                <Button variant="subtle" color="dark" style={style.navbarSection}>
                    <Text size="lg" weight={300}>First Section</Text>
                </Button>
            </div>
          </Navbar.Section>
          <Navbar.Section>
            <div style={{paddingTop: 20}}>
                <Button variant="subtle" color="dark" style={style.navbarSection}>
                    <Text size="lg" weight={300}>Second Section</Text>
                </Button>
            </div>
          </Navbar.Section>
          <Navbar.Section>
            <div style={{paddingTop: 20}}>
                <Button variant="subtle" color="dark" style={style.navbarSection}>
                    <Text size="lg" weight={300}>Third Section</Text>
                </Button>
            </div>
          </Navbar.Section>
          <Navbar.Section>
            <div style={{paddingTop: 20}}>
                <Button variant="subtle" color="dark" style={style.navbarSection}>
                    <Text size="lg" weight={300}>Fourth Section</Text>
                </Button>
            </div>
          </Navbar.Section>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}  ${date.getHours()%12}.${date.getMinutes()}` } 🌚
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
      <ShoppingLists
      shoppingLists={
    			[
            {item:'List 1', date: new Date().toDateString(), user: "Arunim Chakraborty"},
            {item:'List 2', date: new Date().toDateString(), user: "Debika Chakraborty"}, 
            {item:'List 3', date: new Date().toDateString(), user: "Ayan Chakraborty"}
          ]
			}
			/>
    </AppShell>
  );
}

const style = {
    navbarSection: {
        width: "100%", display: "flex", justifyContent: "flex-start"
    }
}