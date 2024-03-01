import {
	AppBar,
	Box,
	Button,
	Container,
	Toolbar,
	Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Header() {
	const navigate = useNavigate();
	const pages = [
		{ name: "Home", path: "/home" },
		{ name: "Profile", path: "/profile" },
	];

	const handleLogoutEvent = () => {
		localStorage.clear();
		navigate("/login");
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="#"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontWeight: 700,
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Demo-App
					</Typography>

					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/home"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontWeight: 700,
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Demo-App
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Link to={page.path}>
								<Button
									key={page.name}
									sx={{ my: 2, color: "white", display: "block" }}
								>
									{page.name}
								</Button>
							</Link>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Button
							sx={{ my: 2, color: "white", display: "block" }}
							onClick={handleLogoutEvent}
						>
							logout
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Header;