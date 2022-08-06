import Login from "./components/Login";
import { MantineProvider } from "@mantine/core";

function App() {
	return (
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<Login />
		</MantineProvider>
	);
}

export default App;
