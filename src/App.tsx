import "./App.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import Profile from "./pages/Profile/Profile";
import { Provider } from "react-redux";
import { store } from "./store/store";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {
	const DefaultLayoutRoute = (element: JSX.Element) => ({
		element: <DefaultLayout />,
		children: [{ path: "", element }],
	});

	const router = createBrowserRouter([
		{ path: "", element: <Navigate to="/login" /> },
		{ path: "/login", element: <Login /> },
		{ path: "/home", ...DefaultLayoutRoute(<Home />) },
		{ path: "/profile", ...DefaultLayoutRoute(<Profile />) },
		{ path: "*", element: <PageNotFound /> }, 
	]);

	return (
		<>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</>
	);
}

export default App;
