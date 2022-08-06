import Signup from "./components/Signup"
import { MantineProvider } from "@mantine/core";

function App() {
	return (
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<Signup />
		</MantineProvider>
	);
}

export default App;
