import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {spotifyApi} from "@/redux/services/spotify-api";
import {menuReducer} from "@/redux/features/menu-slice";
import {terminalReducer} from "@/redux/features/terminal-slice";

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        terminal: terminalReducer,
        [spotifyApi.reducerPath]: spotifyApi.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([spotifyApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;