import Signup from "./components/Signup"
import { Button, MantineProvider, Paper } from "@mantine/core";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import ShoppingLists from "./components/MainPage/ShoppingLists"
import OTPScreen from "./components/OTPScreen";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Preferences } from "@capacitor/preferences";


function App() {
	
	const navigate = useNavigate()

	async function getToken() {
		const ret = Preferences.get({key : 'token'})
			.then(res => {
				console.log({response : res})
				if(res.value != null) {
					localStorage.setItem('token', res.value)
					navigate('mainpage')
				}
			})
			.catch(err => console.log({error : err}))
	}

	useEffect(() => {
		getToken()
		if(localStorage.token) {
			navigate('mainpage')
		}
	}, [])

	return (
		<MantineProvider withGlobalStyles withNormalizeCSS >
			<div>
				<h1 style={{textAlign: "center", marginTop: "20%"}}>Welcome</h1>
				<div style={{marginTop: "20%"}} >
					<div style={{display: "flex", width: "100%", justifyContent: "center"}}>
						<Button color="dark" size="lg" style={{width: "80%"}} onClick={() => navigate('/login')}>
							Login
						</Button>
					</div>
					<div style={{display: "flex", width: "100%", justifyContent: "center"}}>
						<Button color="dark" size="lg" style={{width: "80%", marginTop: 20}} onClick={() => navigate('/signup')}>
							Sign Up
						</Button>
					</div>
				</div>
			</div>
		</MantineProvider>
	);
}

export default App;
