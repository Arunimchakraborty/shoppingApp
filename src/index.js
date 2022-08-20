import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import NewList from "./components/NewList";
import ShowList from "./components/ShowList";
import Signup from "./components/Signup";
import OTPScreen from "./components/OTPScreen";
import Login from "./components/Login";
import { MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<MantineProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<Signup />} />
					<Route path="mainpage" element={<MainPage />} />
					<Route path="/otp/:email" element={<OTPScreen />} />
					<Route path="newlist" element={<NewList />} />
					<Route path="showlist" element={<ShowList />} />
				</Routes>
			</BrowserRouter>
		</MantineProvider>
		{/* <App /> */}
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
