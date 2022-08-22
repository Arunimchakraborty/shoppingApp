import { Button, Modal, NumberInput, useMantineTheme } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { useInputState } from '@mantine/hooks';
import axios from "axios";
import config from "../config";
import { useEffect } from "react";
import { useState } from "react";
import { Preferences } from "@capacitor/preferences";
import { showNotification } from '@mantine/notifications';

export default function OTPScreen() {

    const location = useLocation()
    const locationArray = location.pathname.split('/')
    const email = locationArray.splice(-1)

    const [errorModal, setErrorModal] = useState(false)
    const [errormsg, setErrorMsg] = useState()

    const [notif, showNotif] = useState(false)

    const navigate = useNavigate()

    const [user, setUser] = useState({})

    const [otp, setOtp] = useInputState()

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
		.catch((err) => console.log(err));
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
                navigate('/mainpage')
            })
            .catch((err) => console.log(err));
    }

    // clear storage
    async function clearStorage() {
	    const ret = await Preferences.clear()
		.then((res) => {
			console.log({ res: res, msg: `Cleared Storage succesfully` });
			localStorage.clear();
		})
		.catch((err) => console.log(err));
    }

    function generateOTP() {
        axios.post(`${config.backendLocation}/auth/generate-otp`, {
            email: email
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }

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
        // .then(res => {
        //     console.log(res);
        //     localStorage.clear()
        //     localStorage.setItem('token', res.data.token)
        //     getSelf()
        // })
        // .catch(err => {
        //     console.log(err)
        //     setErrorMsg(err.response.data.msg)
        //     setErrorModal(true)
        // })
        .then(res => {
            console.log(res);
            clearStorage()
            // localStorage.clear()
            setItem('token', res.data.token)
            // localStorage.setItem('token', res.data.token)
        })
        .catch(err => {
            console.log(err)
            setErrorMsg(err.response.data.msg)
            setErrorModal(true)
        })
    }

    // function getSelf() {
    //     axios
    //       .get(`${config.backendLocation}/user/self`, {headers: {token : localStorage.getItem('token')}})
    //       .then(res => {
    //         console.log(res.data)
    //         localStorage.setItem('user', JSON.stringify(res.data))
    //         navigate('/mainpage')
    //       })
    //   }

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
            console.log(err)
            setErrorMsg(err.response.data.msg)
            setErrorModal(true)
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
            <div style={{paddingTop: 20, display: 'flex', width: "100%", justifyContent: "flex-end"}}>
                <Button variant="subtle" color="gray" onClick={() => {
                    showNotification({
                        title: 'OTP sent',
                        message: `OTP sent to ${email}`,
                    })
                    generateOTP()
                }}>
                    Resend OTP
                </Button>
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