import Signup from "./components/Signup"
import { Button, MantineProvider, Paper } from "@mantine/core";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import ShoppingLists from "./components/MainPage/ShoppingLists"
import OTPScreen from "./components/OTPScreen";
import { useNavigate } from "react-router-dom";

function App() {
	const navigate = useNavigate()
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
