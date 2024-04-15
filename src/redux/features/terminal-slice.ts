import { createSlice } from "@reduxjs/toolkit";

type TerminalState = {
	output: Array<string>;
	path: string;
	initialized?: boolean;
};

const initialState: TerminalState = {
	output: [],
	path: "~",
};

const terminalSlice = createSlice({
	name: "terminal",
	initialState,
	reducers: {
		printTerminal: (state, action) => {
			state.output.push(action.payload);
		},
		clearTerminal: (state) => {
			state.output = [];
		},
		pathChange: (state, action) => {
			state.path = action.payload;
		},
		initTerminal: (state) => {
			state.initialized = true;
		},
	},
});

export const { printTerminal, clearTerminal, pathChange, initTerminal } =
	terminalSlice.actions;
export const terminalReducer = terminalSlice.reducer;
