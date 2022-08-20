import { Button, Input } from '@mantine/core';
import { IconAt, IconEyeCheck, IconEyeOff } from '@tabler/icons';
import { PasswordInput } from '@mantine/core';
import { Title } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';
export default function Login(){

    const navigate = useNavigate()

    const [email, setEmail] = useInputState()
    const [password, setPassword] = useInputState()

    function getSelf() {
        axios
          .get(`${config.backendLocation}/user/self`, {headers: {token : localStorage.getItem('token')}})
          .then(res => {
            console.log(res.data)
            localStorage.setItem('user', JSON.stringify(res.data))
            navigate('/mainpage')
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
        </div>
    )
}