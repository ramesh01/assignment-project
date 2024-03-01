import {
	Box,
	Card,
	CardContent,
	CardHeader,
	IconButton,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonAddUpdateModal from "../../components/AddUpdateModal/AddUpdateModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { Person } from "../../config/personsData";
import {
	getPersonDetailsById,
	updatePersonDetails,
} from "../../store/slices/personSlice";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
	const navigate = useNavigate();
	const isLoggedIn: string | null = localStorage.getItem("loggedIn");
	const personId: string | null = localStorage.getItem("personId");
	const [showModal, setShowModal] = useState<boolean>(false);
	const dispatch: AppDispatch = useDispatch();
	let personDetails: any = null;

	useEffect(() => {
		if (isLoggedIn != "true") {
			navigate("/login");
			return;
		}
	}, []);

	if (personId) {
		personDetails = useSelector(getPersonDetailsById(Number(personId)));
	}

	const handleModalClose = () => {
		setShowModal(false);
	};

	const handleEditPersonDetails = () => {
		setShowModal(true);
	};

	const handleFormSubmit = (data: Person) => {
		dispatch(updatePersonDetails(data));
	};

	return (
		<Box component="section" sx={{ mt: 4 }}>
			<Typography variant="h4" component="h4">
				Profile
			</Typography>
			
			<Box>
				{personId && (
					<>
						<Card sx={{ maxWidth: 345 }}>
							<CardHeader
							sx={{pb: 0}}
								title="Person Details"
								action={
									<IconButton onClick={handleEditPersonDetails}>
										<EditIcon />
									</IconButton>
								}
							/>
							<CardContent>
								<Typography>Name: {personDetails?.name}</Typography>
								<Typography>Age: {personDetails?.age}</Typography>
								<Typography>Profession: {personDetails?.profession}</Typography>
							</CardContent>
						</Card>
					</>
				)}
			</Box>
			{showModal && (
				<PersonAddUpdateModal
					data={personDetails}
					modalType="Update"
					onModalClose={handleModalClose}
					onFormSubmit={handleFormSubmit}
				/>
			)}
		</Box>
	);
};

export default Profile;
