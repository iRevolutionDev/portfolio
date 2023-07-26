'use client';

import {FC} from "react";
import {GitHub, LinkedIn} from "@mui/icons-material";
import {SiSpotify} from "react-icons/si";
import Link from "next/link";

export const SocialLinks: FC = ({  }) => {
    return (
        <>
            <Link href="https://github.com/irevolutiondev" target="_blank" rel="noopener noreferrer">
                <GitHub fontSize="large"/>
            </Link>
            <Link href="https://www.linkedin.com/in/revolutionxk/" target="_blank" rel="noopener noreferrer">
                <LinkedIn fontSize="large"/>
            </Link>
            <Link href="https://open.spotify.com/user/jcm4iped0mnqusg2cvq5hy26z" target="_blank" rel="noopener noreferrer">
                <SiSpotify fontSize="1.75rem"/>
            </Link>
        </>
    );
}