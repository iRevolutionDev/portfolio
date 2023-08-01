import {createSlice} from "@reduxjs/toolkit";

type TerminalState = {
    output: Array<string>;
}

const initialState: TerminalState = {
    output: [],
}

const terminalSlice = createSlice({
    name: 'terminal',
    initialState,
    reducers: {
        printTerminal: (state, action) => {
            state.output.push(action.payload);
        },
        clearTerminal: (state) => {
            state.output = [];
        }
    }
})

export const {printTerminal, clearTerminal} = terminalSlice.actions;
export const terminalReducer = terminalSlice.reducer;