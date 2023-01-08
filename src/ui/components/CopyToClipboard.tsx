'use client';

import React from "react";

type Props = {
    text: string;
    children?: React.ReactNode;
}

const CopyToClipboard: React.FC<Props> = ({text, children}) => {

    const _copyToClipboard = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        await navigator.clipboard.writeText(text)
    }

    return (
        <span onClick={_copyToClipboard} className="cursor-pointer">
            {children}
        </span>
    )
}

export default CopyToClipboard;