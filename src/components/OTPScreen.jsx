import { Button, Modal, NumberInput, useMantineTheme } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { useInputState } from '@mantine/hooks';
import axios from "axios";
import config from "../config";
import { useEffect } from "react";
import { useState } from "react";

export default function OTPScreen() {

    const location = useLocation()
    const locationArray = location.pathname.split('/')
    const email = locationArray.splice(-1)

    const [errorModal, setErrorModal] = useState(false)
    const [errormsg, setErrorMsg] = useState()

    const navigate = useNavigate()

    const [user, setUser] = useState({})

    const [otp, setOtp] = useInputState()

    function verifyOTP() {
        axios.post(`${config.backendLocation}/auth/verify`, {
            email: email,
            otp: otp
        })
        .then(res => {
            console.log(res); 
            setUser(res.data)
            login()
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
            password: localStorage.getItem('password')
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

    function getSelf() {
        axios
          .get(`${config.backendLocation}/user/self`, {headers: {token : localStorage.getItem('token')}})
          .then(res => {
            console.log(res.data)
            localStorage.setItem('user', JSON.stringify(res.data))
            navigate('/mainpage')
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
            <ErrorModal setVisible={setErrorModal} visible={errorModal} msg={errormsg}  />
        </div>
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