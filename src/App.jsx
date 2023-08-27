import { Button, MantineProvider } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Preferences } from "@capacitor/preferences";
import config from "./config";
import axios from "axios";

function App() {
	const navigate = useNavigate();

	async function getToken() {
		const ret = Preferences.get({ key: "token" })
			.then((res) => {
				console.log({ response: res });
				if (res.value != null && tokenValid(res.value)) {
					localStorage.setItem("token", res.value);
					navigate("mainpage");
				}
			})
			.catch((err) => console.log({ error: err }));
	}

	function tokenValid(token) {
    axios
      .get(`${config.backendLocation}/user/self`, {headers: {token : token}})
      .then(res => {
				if (res.status == "401"){
					return false;
				}
				else {
					return true;
				}
      })
      .catch(err => {
        console.log(err)
				return false;
      })
  }

	useEffect(() => {
		getToken();
	}, []);

	return (
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<div>
				<h1 style={{ textAlign: "center", marginTop: "20%" }}>Welcome</h1>
				<div style={{ marginTop: "20%" }}>
					<div
						style={{ display: "flex", width: "100%", justifyContent: "center" }}
					>
						<Button
							color="dark"
							size="lg"
							style={{ width: "80%" }}
							onClick={() => navigate("/login")}
						>
							Login
						</Button>
					</div>
					<div
						style={{ display: "flex", width: "100%", justifyContent: "center" }}
					>
						<Button
							color="dark"
							size="lg"
							style={{ width: "80%", marginTop: 20 }}
							onClick={() => navigate("/signup")}
						>
							Sign Up
						</Button>
					</div>
				</div>
			</div>
		</MantineProvider>
	);
}

export default App;
