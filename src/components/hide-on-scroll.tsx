'use client';

import {Slide, useScrollTrigger} from "@mui/material";
import React from "react";

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    disable?: boolean;
    children: React.ReactElement;
}

export function HideOnScroll(props: Props) {
    const {children, window, disable} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger || disable}>
            {children}
        </Slide>
    );
}