import { Button, Input, NumberInput } from '@mantine/core';
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

export default function Signup(){

    const [firstName, setFirstName] = useInputState()
    const [lastName, setLastName] = useInputState()
    const [phoneNumber, setPhoneNumber] = useInputState()
    const [email, setEmail] = useInputState()
    const [password, setPassword] = useInputState()

    const [errorModal, setErrorModal] = useState(false)

    const navigate = useNavigate()

    function signUpAxios() {
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
                console.log(err)
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
            <ErrorModal setVisible={setErrorModal} visible={errorModal}  />
        </div>
    )
}

function ErrorModal({visible, setVisible}) {
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
            <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                <h3>Error</h3>
            </div>
        </Modal>
    )
}