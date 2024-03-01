import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { Person, personsArr } from "../../config/personsData";
import { RootState } from "../store";

export interface HomeSliceState {
	personsData: Person[];
}

const initialState: HomeSliceState = {
	personsData: personsArr,
};

export const personSlice = createSlice({
	name: "personSlice",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addNewPersonDetails, (state, action: PayloadAction<Person>) => {
				state.personsData.push({
					id: state.personsData.length + 1,
					...action.payload,
				});
			})
			.addCase(updatePersonDetails, (state, action: PayloadAction<Person>) => {
				const updatedPersonDetails = action.payload;
				const index = state.personsData.findIndex(
					(person) => person.id === updatedPersonDetails.id
				);

				if (index !== -1) {
					state.personsData[index] = updatedPersonDetails;
				}
			});
	},
});

export const getPersonsData = (store: RootState) => {
	return store.personSlice.personsData;
};

export const getPersonDetailsById = (id: number) => (store: RootState) => {
	return store.personSlice.personsData.find((person) => person.id === id);
};

export const addNewPersonDetails = createAction<Person>(
	"personSlice/addNewPersonDetails"
);

export const updatePersonDetails = createAction<Person>(
	"personSlice/updatePersonDetails"
);

export default personSlice.reducer;
