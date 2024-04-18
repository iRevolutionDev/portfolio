import { Circle } from "@/components/circle";
import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

type JobDetailsCardItemProps = {
	title: string;
	position: string;
};

const Item: FC<PropsWithChildren<JobDetailsCardItemProps>> = ({
	title,
	children,
	position,
}) => {
	return (
		<Grid item xs={12} md={6} className="!pl-0 md:!pl-2" display="flex">
			<Card
				className="!mr-4 md:!mr-0"
				elevation={0}
				variant="outlined"
				sx={{
					"&:hover": {
						borderColor: "primary.main",
						transition: "border-color 0.2s ease-in-out",
					},
					height: "100%",
				}}
			>
				<Stack
					direction="column"
					className="h-full"
					spacing={2}
					justifyContent="space-between"
				>
					<CardContent>
						<Typography variant="h5" fontWeight={700} sx={{ marginBottom: 1 }}>
							{title}
						</Typography>
						<Typography variant="body1" className="opacity-60">
							{children}
						</Typography>
					</CardContent>
					<Stack
						direction="row"
						spacing={1}
						alignItems="center"
						sx={{ padding: 2 }}
					>
						<Circle />
						<Typography variant="body1" className="opacity-60">
							{position}
						</Typography>
					</Stack>
				</Stack>
			</Card>
		</Grid>
	);
};

const Root: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Grid container spacing={2} alignItems="stretch">
			{children}
		</Grid>
	);
};

export const JobDetailsCard = {
	Root,
	Item,
};
