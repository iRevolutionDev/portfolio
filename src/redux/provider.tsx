"use client";

import { persist, store } from "@/redux/store";
import type React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persist} loading={null}>
				{children}
			</PersistGate>
		</Provider>
	);
};
