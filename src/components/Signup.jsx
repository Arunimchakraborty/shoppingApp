import { Button, Input, LoadingOverlay, NumberInput } from '@mantine/core';
import { IconAt, IconEyeCheck, IconEyeOff, IconKey, IconPhone } from '@tabler/icons';
import { PasswordInput } from '@mantine/core';
import { Title } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import config from '../config';
import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import BackButton from './BackButton';

export default function Signup(){

    const [firstName, setFirstName] = useInputState()
    const [lastName, setLastName] = useInputState()
    const [phoneNumber, setPhoneNumber] = useInputState()
    const [email, setEmail] = useInputState()
    const [password, setPassword] = useInputState()

    const [errorModal, setErrorModal] = useState(false)
    const [errormsg, setErrorMsg] = useState()

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    function signUpAxios() {
        setLoading(true)
        axios
        .post(`${config.backendLocation}/auth/register`, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phoneNumber: phoneNumber
        })
        .then(
            (res) => {
                console.log(res);
                localStorage.setItem('password', password)
                generateOTP();
            }
        )
        .catch(
            (err) => {
                setLoading(false)
                console.log(err)
                setErrorMsg(err.response.data.msg)
                setErrorModal(true)
            }
        )
    }

    function generateOTP() {
        axios.post(`${config.backendLocation}/auth/generate-otp`, {
            email: email
        })
        .then(res => {console.log(res); navigate(`/otp/${email}`)})
        .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log({"SignUp" : {firstName,lastName,phoneNumber,email,password}})}, 
        [firstName,lastName,phoneNumber,email,password])
    return(
        <div style={{paddingTop: 20, paddingBottom: 20, paddingLeft: 30, paddingRight: 30}}>
            <LoadingOverlay visible={loading} overlayBlur={2} transitionDuration={100}/>
            <div style={{position: "absolute", top: 10, left: 10}}>
                <BackButton onClick={() => {navigate('../')}} />
            </div>
            <div style={{display: "flex", width: "100%", justifyContent: "center",paddingTop: 20, paddingBottom: 40 }}>
                <Title order={1}>Sign Up</Title>
            </div>
            <div style={{paddingTop: 20, paddingBottom: 10,}}>
                <Input
                value={firstName} onChange={setFirstName}
                placeholder="First Name"
                />
            </div>
            <div style={{paddingTop: 10, paddingBottom: 10,}}>
                <Input
                value={lastName} onChange={setLastName}
                placeholder="Last Name"
                />
            </div>
            <div style={{paddingTop: 10, paddingBottom: 10,}}>
                <NumberInput
                value={phoneNumber} onChange={setPhoneNumber}
                icon={<IconPhone />}
                placeholder="Phone Number"
                />
            </div>
            <div style={{paddingTop: 30, paddingBottom: 20,}}>
                <Input
                value={email} onChange={setEmail}
                icon={<IconAt />}
                placeholder="Your email"
                />
            </div>
            <div style={{paddingTop: 20, paddingBottom: 20,}}>
                <PasswordInput
                value={password} onChange={setPassword}
                placeholder="Password"
                required
                icon={<IconKey />}
                visibilityToggleIcon={({ reveal, size }) =>
                reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
      }
                />
            </div>
            <div style={{display: 'flex', justifyContent: "center", paddingTop: 20}}>
                <Button color="dark" onClick={() => {signUpAxios()}}>
                    Sign Up
                </Button>
            </div>
            <div style={{display: "flex", position: "absolute", top: 10, right: 10}}>
                <Button variant="subtle" color="dark" onClick={() => navigate('/login')}>
                    Login
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