'use client';

import {IconButton} from "@mui/material";
import {toggleMenu} from "@/redux/features/menu-slice";
import {Close, Menu} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";

const MenuButton = () => {
    const {open} = useAppSelector(state => state.menu)
    const dispatch = useAppDispatch();

    return (
        <IconButton edge="start" color="inherit" aria-label="menu"
                    onClick={() => dispatch(toggleMenu())}
        >
            {open ? <Close/> : <Menu/>}
        </IconButton>
    )
}

export default MenuButton;