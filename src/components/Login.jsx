import { Button, Input, Modal, useMantineTheme } from '@mantine/core';
import { IconAt, IconEyeCheck, IconEyeOff } from '@tabler/icons';
import { PasswordInput } from '@mantine/core';
import { Title } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Login(){

    const navigate = useNavigate()

    const [email, setEmail] = useInputState()
    const [password, setPassword] = useInputState()

    const [errorModal, setErrorModal] = useState(false)
    const [errormsg, setErrorMsg] = useState()

    function getSelf() {
        axios
          .get(`${config.backendLocation}/user/self`, {headers: {token : localStorage.getItem('token')}})
          .then(res => {
            console.log(res.data)
            localStorage.setItem('user', JSON.stringify(res.data))
            navigate('/mainpage')
          })
          .catch(err => {
            console.log(err)
            setErrorMsg(err.response.data.msg)
            setErrorModal(true)
          })
      }

    function login() {
        axios.post(`${config.backendLocation}/auth/login`, {
            email: email,
            password: password
        })
        .then(res => {
            console.log(res);
            localStorage.clear()
            localStorage.setItem('token', res.data.token)
            getSelf()
        })
        .catch(err => {
            console.log(err)
            setErrorMsg(err.response.data.msg)
            setErrorModal(true)
        })
    }

    return(
        <div style={{paddingTop: 20, paddingBottom: 20, paddingLeft: 30, paddingRight: 30}}>
            <div style={{display: "flex", width: "100%", justifyContent: "center",paddingTop: 20, paddingBottom: 40 }}>
                <Title order={1}>Login</Title>
            </div>
            <div style={{paddingTop: 20, paddingBottom: 20,}}>
                <Input
                icon={<IconAt />}
                placeholder="Your email"
                value={email} onChange={setEmail}
                />
            </div>
            <div style={{paddingTop: 20, paddingBottom: 20,}}>
                <PasswordInput
                placeholder="Password"
                label="Password"
                description="Password must include at least one letter, number and special character"
                required
                visibilityToggleIcon={({ reveal, size }) =>
                reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
                }
                value={password} onChange={setPassword}
                />
            </div>
            <div style={{display: 'flex', justifyContent: "center", paddingTop: 20}}>
                <Button color="dark" onClick={() => login()}>
                    Login
                </Button>
            </div>
            <div style={{display: "flex", position: "absolute", top: 10, right: 10}}>
                <Button variant="subtle" color="dark" onClick={() => navigate('/signup')}>
                    Sign Up
                </Button>
            </div>
            <ErrorModal setVisible={setErrorModal} visible={errorModal} msg={errormsg}  />
        </div>
    )
}

function ErrorModal({visible, setVisible, msg}) {
    const theme = useMantineTheme();
    return (
        <Modal
        opened={visible}
        centered
        onClose={() => setVisible(false)}
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        >
            <div>
                <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
                    <h1>Error</h1>
                </div>
                <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
                    <h4>{msg}</h4>
                </div>
            </div>
        </Modal>
    )
}