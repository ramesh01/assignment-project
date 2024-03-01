import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";

const Login = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	useEffect(() => {
		// ?initialUsername=test@123&initialPassword=123456
		// C. Store the initialUsername & initialPassword
		const initialUsername = searchParams.get("initialUsername");
		const initialPassword = searchParams.get("initialPassword");

		if (initialUsername && initialPassword) {
			const initialLoginCredentials = {
				username: initialUsername,
				password: initialPassword,
			};
			localStorage.setItem(
				"initialLoginCredentials",
				JSON.stringify(initialLoginCredentials)
			);
		}
		navigate("/login");
	}, []);

	const validate = (values: { username: string; password: string }) => {
		const errors: Record<string, string> = {};
		const storedCredentialsString = localStorage.getItem(
			"initialLoginCredentials"
		);
		let initialUsrName = null;
		let initialPassword = null;
		if (storedCredentialsString) {
			({ username: initialUsrName, password: initialPassword } = JSON.parse(
				storedCredentialsString
			));
		}

		const { username, password } = values;
		if (!username) {
			errors.username = "Required";
		} else if (username !== initialUsrName) {
			errors.username = "Invalid username";
		}

		if (!password) {
			errors.password = "Required";
		} else if (password !== initialPassword) {
			errors.password = "Invalid password";
		}
		return errors;
	};

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validate,
		onSubmit: () => {
			localStorage.setItem("loggedIn", true.toString());
            navigate("/home");
		},
	});
	return (
		<div className="container">
			<Box
				sx={{
					marginTop: "10rem",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Box
					component="form"
					onSubmit={formik.handleSubmit}
					noValidate
					sx={{ mt: 6 }}
				>
					<TextField
						error={formik.errors?.username ? true : false}
						margin="normal"
						required
						fullWidth
						id="username"
						label="User Name"
						name="username"
						autoComplete="username"
						autoFocus
						onChange={formik.handleChange}
						value={formik.values.username}
						helperText={formik.errors?.username}
					/>

					<TextField
						error={formik.errors?.password ? true : false}
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={formik.handleChange}
						value={formik.values.password}
						helperText={formik.errors?.password}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Log in
					</Button>
				</Box>
			</Box>
		</div>
	);
};

export default Login;
