'use client';

import {Button, styled} from "@mui/material";
import Link from "next/link";
import {ReactNode} from "react";

interface NavButtonProps {
    href: string;
    children?: ReactNode;
}

export const NavButton = styled(
    ({href, children, ...otherProps}: NavButtonProps) =>
        <Button component={Link}
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