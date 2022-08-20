import { Button, Modal, NumberInput, useMantineTheme } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { useInputState } from '@mantine/hooks';
import axios from "axios";
import config from "../config";
import { useEffect } from "react";
import { useState } from "react";

export default function OTPScreen() {

    const location = useLocation()
    const locationArray = location.pathname.split('/')
    const email = locationArray.splice(-1)

    const [user, setUser] = useState({})

    const [otp, setOtp] = useInputState()

    function verifyOTP() {
        axios.post(`${config.backendLocation}/auth/verify`, {
            email: email,
            otp: otp
        })
        .then(res => {
            console.log(res); 
            login()
        })
        .catch(err => console.log(err))
    }

    function login() {
        axios.post(`${config.backendLocation}/auth/login`, {
            email: email,
            password: localStorage.getItem('password')
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div style={{paddingTop: 20}}>
            <div style={style.center}>
                <h1>Enter OTP</h1>
            </div>
            <div style={style.center}>
                <NumberInput
                value={otp} onChange={setOtp}
                placeholder="Enter OTP"
                maxLength={4}
                style={{width: "75%", paddingTop: 20, borderRadius: 20}}
                size="xl"
                radius={"sm"}
                />
            </div>
            <div style={style.centerButton}>
                <Button color="dark" size="md" style={{width: "50%"}} onClick={() => {verifyOTP()}}>
                    Verify
                </Button>
            </div>
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

const style = {
    center: {
        display: "flex", width: "100%", justifyContent: "center" 
    },
    centerButton: {
        display: "flex", width: "100%", justifyContent: "center", 
        position: "absolute", bottom: 80
    }

}