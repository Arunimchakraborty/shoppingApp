import { Button, Input, LoadingOverlay, Modal, useMantineTheme } from '@mantine/core';
import { IconAt, IconEyeCheck, IconEyeOff } from '@tabler/icons';
import { PasswordInput } from '@mantine/core';
import { Title } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Preferences } from '@capacitor/preferences';
import BackButton from './BackButton';
export default function Login(){

    const navigate = useNavigate()

    const [email, setEmail] = useInputState()
    const [password, setPassword] = useInputState()

    const [errorModal, setErrorModal] = useState(false)
    const [errormsg, setErrorMsg] = useState()

    const [loading, setLoading] = useState(false)

    // set item
    async function setItem(key, item) {
        await Preferences.set({
            key: key,
            value: item,
        })
		.then((res) => {
			console.log({ res: res, msg: `Saved Item succesfully` });
			localStorage.setItem(key, item);
            getSelf()
		})
		.catch((err) => {console.log(err); setLoading(false)});
    }

    // set object
    async function setObject(key, object) {
        await Preferences.set({
            key: key,
            value: JSON.stringify(object),
        })
            .then((res) => {
                console.log({ res: res, msg: `Saved object succesfully` });
                localStorage.setItem(key, JSON.stringify(object));
                // setLoading(false)
                navigate('/mainpage')
            })
            .catch((err) => {console.log(err); setLoading(false)});
    }

    // clear storage
    async function clearStorage() {
	    const ret = await Preferences.clear()
		.then((res) => {
			console.log({ res: res, msg: `Cleared Storage succesfully` });
			localStorage.clear();
		})
		.catch((err) => {console.log(err); setLoading(false)});
    }

    function getSelf() {
        axios
          .get(`${config.backendLocation}/user/self`, {headers: {token : localStorage.getItem('token')}})
          .then(res => {
            console.log(res.data)
            // localStorage.setItem('user', JSON.stringify(res.data))
            setObject('user', res.data)
            // navigate('/mainpage')
          })
          .catch(err => {
            setLoading(false)
            console.log(err)
            setErrorMsg(err.response.data.msg)
            setErrorModal(true)
          })
    }

    function login() {
        setLoading(true)
        axios.post(`${config.backendLocation}/auth/login`, {
            email: email,
            password: password
        })
        .then(res => {
            console.log(res);
            clearStorage()
            // localStorage.clear()
            setItem('token', res.data.token)
            // localStorage.setItem('token', res.data.token)
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
            setErrorMsg(err.response.data.msg)
            setErrorModal(true)
        })
    }

    return(
        <div style={{paddingTop: 20, paddingBottom: 20, paddingLeft: 30, paddingRight: 30}}>
            <LoadingOverlay visible={loading} overlayBlur={2} transitionDuration={100}/>
            <div style={{position: "absolute", top: 10, left: 10}}>
                <BackButton onClick={() => {navigate('../')}} />
            </div>
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