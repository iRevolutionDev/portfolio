"use client";
import { Technologies } from "@/constants/technologies";
import { Card, Stack, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TechnologyList() {
	const [items, setItems] = useState<typeof Technologies>([Technologies[0]]);

	useEffect(() => {
		if (items.length === Technologies.length) return;

		const interval = setInterval(() => {
			setItems((prev) => {
				return Technologies.slice(0, prev.length + 1);
			});
		}, 200);

		return () => {
			clearInterval(interval);
		};
	}, [items]);

	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<Card
				component={motion.div}
				className="p-2 flex w-fit min-h-12 transition-all"
				elevation={0}
				sx={{ borderRadius: 10 }}
				variant="outlined"
				layout
			>
				<Stack
					direction="row"
					flexWrap="wrap"
					spacing={2}
					alignContent="center"
					alignItems="center"
					justifyContent="center"
				>
					{items.map((technology) => (
						<Tooltip key={technology.name} title={technology.name} arrow>
							<motion.div
								key={technology.name}
								initial={{
									opacity: 0,
									scale: 0,
									x: -10,
								}}
								animate={{
									opacity: 1,
									scale: 1,
									x: 0,
								}}
								transition={{
									duration: 0.5,
									delay: 0.1,
								}}
								layout
							>
								{technology.icon}
							</motion.div>
						</Tooltip>
					))}
				</Stack>
			</Card>
		</div>
	);
}
