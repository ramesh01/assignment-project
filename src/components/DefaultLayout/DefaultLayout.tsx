import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { Container } from "@mui/material";

const DefaultLayout = () => {
	return (
		<main>
			<Header />
			<Container>
				<Outlet />
			</Container>
		</main>
	);
};

export default DefaultLayout;
