import storage from "@/redux/custom-storage";
import { menuReducer } from "@/redux/features/menu-slice";
import { terminalReducer } from "@/redux/features/terminal-slice";
import { themeReducer } from "@/redux/features/theme-slice";
import { spotifyApi } from "@/redux/services/spotify-api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from "redux-persist";
import type { PersistConfig } from "redux-persist/es/types";

export const rootReducers = combineReducers({
	menu: menuReducer,
	terminal: terminalReducer,
	theme: themeReducer,
	[spotifyApi.reducerPath]: spotifyApi.reducer,
});

const persistConfig: PersistConfig<ReturnType<typeof rootReducers>> = {
	key: "root",
	storage: storage,
	version: 1,
	whitelist: ["theme"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat([spotifyApi.middleware]),
});

setupListeners(store.dispatch);

export const persist = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
