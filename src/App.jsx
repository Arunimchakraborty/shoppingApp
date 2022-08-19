import Signup from "./components/Signup"
import { MantineProvider, Paper } from "@mantine/core";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import ShoppingLists from "./components/ShoppingLists"

function App() {
	return (
		<MantineProvider withGlobalStyles withNormalizeCSS >
			<Paper>
				<MainPage name={'Arunim'} />
				{/* <ShoppingLists shoppingLists={['hellu', 'well well well']} /> */}
			</Paper>
		</MantineProvider>
	);
}

export default App;
