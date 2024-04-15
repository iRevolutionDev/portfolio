"use client";
import { setTheme, toggleTheme } from "@/redux/features/theme-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export const useTheme = () => {
	const { theme } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	return {
		theme,
		toggleTheme: () => dispatch(toggleTheme()),
		setTheme: (theme: string) => dispatch(setTheme(theme)),
	};
};
