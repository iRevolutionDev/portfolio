'use client';

import {Button, styled} from "@mui/material";

export const NavButton = styled(Button)(({theme}) => ({
    borderRadius: "32px",
    minWidth: "0",
    padding: ".75rem 1.25rem",
    fontSize: "1rem",
    lineHeight: "1.25rem",
    fontWeight: "500",
    textTransform: "none",
}));