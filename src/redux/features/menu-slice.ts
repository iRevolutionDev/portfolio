import { createSlice } from "@reduxjs/toolkit";

type MenuState = {
	open: boolean;
};

const initialState: MenuState = {
	open: false,
};

const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		toggleMenu: (state) => {
			state.open = !state.open;
		},
		closeMenu: (state) => {
			state.open = false;
		},
		openMenu: (state) => {
			state.open = true;
		},
	},
});

export const { toggleMenu, closeMenu, openMenu } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
