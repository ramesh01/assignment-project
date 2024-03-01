import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	addNewPersonDetails,
	getPersonsData,
} from "../../store/slices/personSlice";
import { Person } from "../../config/personsData";
import {
	Box,
	Button,
	Table,
	TableBody,
	TableContainer,
	Typography,
	styled,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AppDispatch } from "../../store/store";
import PersonAddUpdateModal from "../../components/AddUpdateModal/AddUpdateModal";

const Home = () => {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const isLoggedIn = localStorage.getItem("loggedIn");

	const personArr: Person[] = useSelector(getPersonsData);
	const [showModal, setShowModal] = useState<boolean>(false);

	useEffect(() => {
		if (isLoggedIn != "true") {
			navigate("/login");
		}
	}, [isLoggedIn]);

	const handleAddNewPersonDetails = () => {
		setShowModal(true);
	};

	const handleModalClose = () => {
		setShowModal(false);
	};

	const handleRowClick = (id: number) => {
		localStorage.setItem("personId", id.toString());
		navigate("/profile");
	};

	const personsListTableUi = () => {
		const StyledTableCell = styled(TableCell)(({ theme }) => ({
			[`&.${tableCellClasses.head}`]: {
			  backgroundColor: "#1976d2",
			  color: theme.palette.common.white,
			},
			[`&.${tableCellClasses.body}`]: {
			  fontSize: 14,
			},
		  }));
		  
		return (
			<>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<StyledTableCell align="center">Name</StyledTableCell>
								<StyledTableCell align="center">Age</StyledTableCell>
								<StyledTableCell align="center">Profession</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{personArr.map((person: Person) => (
								<TableRow
									hover
									key={person.name}
									sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
									onClick={() => handleRowClick(person.id!)}
								>
									<TableCell align="center">{person.name}</TableCell>
									<TableCell align="center">{person.age}</TableCell>
									<TableCell align="center">{person.profession}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</>
		);
	};

	const handleFormSubmit = (data: Person) => {
		dispatch(addNewPersonDetails(data));
	};

	return (
		<Box component="section" sx={{ mt: 4 }}>
			<Typography variant="h4" component="h4">
				Home
			</Typography>
			<Button
				variant="contained"
				sx={{ float: "right", mb: 2 }}
				onClick={handleAddNewPersonDetails}
			>
				Add New Person
			</Button>
			{personsListTableUi()}
			{showModal && (
				<PersonAddUpdateModal
					data={{ name: "", age: 0, profession: "" }}
					onModalClose={handleModalClose}
					onFormSubmit={handleFormSubmit}
				/>
			)}
		</Box>
	);
};

export default Home;
