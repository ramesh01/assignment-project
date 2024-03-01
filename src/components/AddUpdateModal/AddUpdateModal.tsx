import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { Person } from "../../config/personsData";

type InputProps = {
	data: { name: string; age: number; profession: string };
	modalType?: string;
	onModalClose: (value: boolean) => void;
	onFormSubmit: (value: Person) => void;
};
const PersonAddUpdateModal: FC<InputProps> = ({
	data,
	modalType = 'Add',
	onModalClose,
	onFormSubmit,
}) => {
	const [showModal] = useState<boolean>(true);

	const handleClose = (
		_event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		reason?: string
	) => {
		if (reason && reason === "backdropClick") {
			return;
		}
		myCloseModal();
	};
	const myCloseModal = () => {
		onModalClose(false);
	};

	const formik = useFormik({
		initialValues: data,
		onSubmit: () => {
			onFormSubmit({
				...formik.values,
			});
			myCloseModal();
			formik.resetForm();
		},
	});

	return (
		<>
			<Dialog
				open={showModal}
				onClose={handleClose}
				PaperProps={{
					component: "form",
					onSubmit: formik.handleSubmit,
				}}
			>
				<DialogTitle>{modalType} Details</DialogTitle>
				<DialogContent dividers>
					<TextField
						autoFocus
						required
						margin="dense"
						id="name"
						name="name"
						label="Name"
						fullWidth
						value={formik.values.name}
						onChange={formik.handleChange}
					/>
					<TextField
						autoFocus
						required
						margin="dense"
						id="age"
						name="age"
						label="Age"
						fullWidth
						value={formik.values.age}
						onChange={formik.handleChange}
					/>
					<TextField
						autoFocus
						required
						margin="dense"
						id="profession"
						name="profession"
						label="Profession"
						fullWidth
						value={formik.values.profession}
						onChange={formik.handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button variant="contained" type="submit">
						{modalType}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default PersonAddUpdateModal;
