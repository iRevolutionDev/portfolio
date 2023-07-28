import {FC} from "react";
import "@/components/location-card/location-card.css";
import {Paper, Stack, Typography} from "@mui/material";
import {LocationOn} from "@mui/icons-material";
import Link from "next/link";

export const LocationCard: FC = ({}) => {
    return (
        <Link href="https://www.google.com/maps/place/S%C3%A3o+Paulo,+State+of+S%C3%A3o+Paulo/"
              rel="noopener noreferrer" target="_blank">
            <Paper className="p-2" elevation={0} sx={{borderRadius: 10}} variant="outlined">
                <Stack direction="row" spacing={2} alignContent="center" alignItems="center">
                    <LocationOn fontSize="small"/>
                    <Typography variant="body1">
                        Brazil - São Paulo
                    </Typography>
                    <div className="h-4 w-4 rounded-full bg-[#ffb3b1] relative">
                        <span className="w-2 h-2 bg-white location-ping"/>
                    </div>
                </Stack>
            </Paper>
        </Link>
    );
}