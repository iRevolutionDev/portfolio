import storage from "@/redux/custom-storage";
import { menuReducer } from "@/redux/features/menu-slice";
import { terminalReducer } from "@/redux/features/terminal-slice";
import { themeReducer } from "@/redux/features/theme-slice";
import { spotifyApi } from "@/redux/services/spotify-api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";

export const rootReducers = combineReducers({
	menu: menuReducer,
	terminal: terminalReducer,
	theme: themeReducer,
	[spotifyApi.reducerPath]: spotifyApi.reducer,
});

const persistConfig = {
	key: "root",
	storage: storage,
	whitelist: ["theme"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat([spotifyApi.middleware]),
});

setupListeners(store.dispatch);

export const persist = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
