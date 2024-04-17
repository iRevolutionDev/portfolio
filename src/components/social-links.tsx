"use client";

import { GitHub, LinkedIn } from "@mui/icons-material";
import { Stack } from "@mui/material";
import Link from "next/link";
import type { FC } from "react";
import { SiSpotify } from "react-icons/si";

export const SocialLinks: FC = () => {
	return (
		<Stack
			direction="row"
			spacing={2}
			justifyContent="center"
			alignItems="center"
		>
			<Link
				href="https://github.com/irevolutiondev"
				target="_blank"
				rel="noopener noreferrer"
			>
				<GitHub fontSize="large" />
			</Link>
			<Link
				href="https://www.linkedin.com/in/revolutionxk/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<LinkedIn fontSize="large" />
			</Link>
			<Link
				href="https://open.spotify.com/user/jcm4iped0mnqusg2cvq5hy26z"
				target="_blank"
				rel="noopener noreferrer"
			>
				<SiSpotify fontSize="1.75rem" />
			</Link>
		</Stack>
	);
};
