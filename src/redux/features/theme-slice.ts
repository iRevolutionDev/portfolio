import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ThemeSliceState = {
    theme: string;
}

const initialState: ThemeSliceState = {
    theme: "dark",
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "dark" ? "light" : "dark";
        },
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        }
    }
});

export const {toggleTheme, setTheme} = themeSlice.actions;
export const themeReducer = themeSlice.reducer;