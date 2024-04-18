"use client";

import { toggleMenu } from "@/redux/features/menu-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Close, Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const MenuButton = () => {
	const { open } = useAppSelector((state) => state.menu);
	const dispatch = useAppDispatch();

	return (
		<IconButton
			edge="start"
			color="inherit"
			aria-label="menu"
			onClick={() => dispatch(toggleMenu())}
		>
			{open ? <Close /> : <Menu />}
		</IconButton>
	);
};

export default MenuButton;
