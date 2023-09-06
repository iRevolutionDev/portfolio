import {FC, PropsWithChildren} from "react";
import "@/components/location-card/location-card.css";
import {Paper, Stack} from "@mui/material";
import Link from "next/link";

const Ping = () => {
    return (
        <div className="h-4 w-4 rounded-full bg-[#ffb3b1] relative">
            <span className="w-2 h-2 bg-white location-ping"/>
        </div>
    )
}

type RootProps = {
    href: string;
}

const Root: FC<PropsWithChildren<RootProps>> = ({children, href}) => {
    return (
        <Link href={href}
              rel="noopener noreferrer" target="_blank">
            <Paper className="p-2" elevation={0} sx={{borderRadius: 10}} variant="outlined">
                <Stack direction="row" spacing={2} alignContent="center" alignItems="center">
                    {children}
                </Stack>
            </Paper>
        </Link>
    );
}

export const Location = {
    Root,
    Ping
}