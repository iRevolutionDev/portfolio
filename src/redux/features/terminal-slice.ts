import {createSlice} from "@reduxjs/toolkit";

type TerminalState = {
    output: Array<string>;
    path: string;
}

const initialState: TerminalState = {
    output: [],
    path: '~'
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
        },
        pathChange: (state, action) => {
            state.path = action.payload;
        }
    }
})

export const {printTerminal, clearTerminal, pathChange} = terminalSlice.actions;
export const terminalReducer = terminalSlice.reducer;