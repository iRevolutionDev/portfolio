import { createSlice } from "@reduxjs/toolkit";

type PageState = {
	transition: boolean;
};

const initialState: PageState = {
	transition: false,
};

const pageSlice = createSlice({
	name: "page",
	initialState,
	reducers: {
		setTransition: (state, action) => {
			state.transition = action.payload;
		},
	},
});

export const { setTransition } = pageSlice.actions;
export const pageReducer = pageSlice.reducer;
