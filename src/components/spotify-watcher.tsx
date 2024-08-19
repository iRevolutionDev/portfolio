"use client";
import { limitText } from "@/helpers/limit-text";
import { useGetTracksQuery } from "@/redux/services/spotify-api";
import { Stack, Tooltip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { type FC, useEffect, useState } from "react";
import { BiLogoSpotify } from "react-icons/bi";

const MAX_TEXT_LENGTH = 20;

export const SpotifyWatcher: FC = () => {
	const t = useTranslations("layout.spotifyWidget");

	const [hidden, setHidden] = useState(false);
	const { data, isLoading, isFetching, isError } = useGetTracksQuery();

	useEffect(() => {
		const timeout = setTimeout(() => setHidden(true), 5000);

		return () => clearTimeout(timeout);
	}, []);

	const isPlaying = data?.is_playing;
	const track = data?.item;
	const album = track?.album;
	const artists = track?.artists;
	const image = album?.images[0]?.url;

	return isLoading || isFetching || isError || !isPlaying ? (
		<Stack
			className={`h-full transition-all duration-300 ease-in-out ${hidden ? "gap-0" : "gap-2"}`}
			direction="row"
			alignContent="center"
			alignItems="center"
			justifyContent="end"
			onMouseOut={() => setHidden(true)}
			onMouseOver={() => setHidden(false)}
		>
			<BiLogoSpotify size={24} />
			<motion.div
				initial={{ width: 0 }}
				animate={{
					width: hidden ? 0 : "100%",
				}}
				exit={{ width: 0 }}
				transition={{ duration: 0.7 }}
				className="text-nowrap overflow-hidden"
			>
				<Typography variant="body1" className="opacity-60">
					{t("status.notPlaying")}
				</Typography>
			</motion.div>
		</Stack>
	) : (
		<Stack
			className="h-full"
			direction="row"
			spacing={2}
			alignContent="center"
			alignItems="center"
		>
			{image && (
				<Tooltip title={album?.name} placement="bottom">
					<Image
						src={image}
						width={50}
						height={50}
						className="rounded"
						alt={track?.name ?? "Album cover"}
						loading="lazy"
					/>
				</Tooltip>
			)}
			<Stack direction="column" spacing={0}>
				<Typography variant="body1" className="opacity-60">
					{limitText(track?.name ?? "No track name", MAX_TEXT_LENGTH)}
				</Typography>
				<Typography variant="body2" className="opacity-60">
					{limitText(
						artists?.map((artist) => artist.name).join(", ") ?? "No artist",
						MAX_TEXT_LENGTH,
					)}
				</Typography>
			</Stack>
		</Stack>
	);
};
