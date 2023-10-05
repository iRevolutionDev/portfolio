'use client';

import {Button} from "@mui/material";
import {styled} from "@mui/material/styles";
import Link from "next/link";
import {ReactNode} from "react";
import {useAppDispatch} from "@/redux/hooks";
import {closeMenu} from "@/redux/features/menu-slice";

interface NavButtonProps {
    href: string;
    onClick?: () => void;
    children?: ReactNode;
}

const NavButtonStyled = styled(
    ({href, children, onClick, ...otherProps}: NavButtonProps) =>
        <Button component={Link}
                onClick={onClick}
                href={href} {...otherProps}>
            {children}
        </Button>)
(({theme}) => ({
    borderRadius: "32px",
    minWidth: "0",
    padding: ".75rem 1.25rem",
    fontSize: "1rem",
    lineHeight: "1.25rem",
    fontWeight: "500",
    textTransform: "none",

    [theme.breakpoints.down("md")]: {
        width: "100%",
        padding: ".75rem 1rem",
        justifyContent: "flex-start",
    }
}));

export const NavButton = ({href, children}: NavButtonProps) => {
    const dispatch = useAppDispatch();

    return (
        <NavButtonStyled href={href} onClick={() => dispatch(closeMenu())}>
            {children}
        </NavButtonStyled>
    )
}