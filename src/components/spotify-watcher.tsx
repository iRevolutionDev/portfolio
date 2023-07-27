'use client';
import {FC} from "react";
import {Stack, Tooltip, Typography} from "@mui/material";
import {BiLogoSpotify} from "react-icons/bi";
import {useGetTracksQuery} from "@/redux/services/spotify-api";
import Image from "next/image";

export const SpotifyWatcher: FC = () => {
    const {data, isLoading, isFetching} = useGetTracksQuery();

    return (
        (isLoading || isFetching || !data?.is_playing) ? (
            <Stack className="h-full" direction="row" spacing={2} alignContent="center" alignItems="center">
                <BiLogoSpotify size={24}/>
                <Typography variant="body1" className="opacity-60">
                    Nothing playing right now.
                </Typography>
            </Stack>
        ) : (
            <Stack className="h-full" direction="row" spacing={2} alignContent="center" alignItems="center">
                {data?.item?.album?.images[0]?.url && (
                    <Tooltip title={data?.item?.album?.name} placement="bottom">
                        <Image src={data?.item?.album?.images[0]?.url} width={50} height={50} className="rounded"
                               alt={data?.item?.name} loading="lazy"/>
                    </Tooltip>
                )}
                <Stack direction="column" spacing={0}>
                    <Typography variant="body1" className="opacity-60">
                        {data?.item?.name}
                    </Typography>
                    <Typography variant="body2" className="opacity-60">
                        {data?.item?.artists?.map((artist) => artist.name).join(', ')}
                    </Typography>
                </Stack>
            </Stack>
        )
    )
}