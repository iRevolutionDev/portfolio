"use client";
import { Terminal } from "@/components/terminal/terminal";
import { commands } from "@/features/terminal/commands-register";
import { terminalEventDispatcher } from "@/features/terminal/terminal-event-dispatcher";
import { HOST, WELCOME_MESSAGE } from "@/helpers/constants";
import { pathChange } from "@/redux/features/terminal-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

export default function Page() {
	const { path } = useAppSelector((state) => state.terminal);
	const dispatch = useAppDispatch();

	useEffect(() => {
		terminalEventDispatcher.on("onDirectoryChanged", onPathChange);
	}, []);

	const onPathChange = (path: string) => {
		dispatch(pathChange(path));
	};

	return (
		<div className="p-4 w-screen h-screen">
			<Terminal
				commands={commands}
				prompt={`[@green](${HOST}@localhost):[#ff0000](${path})$`}
				welcomeMessage={WELCOME_MESSAGE}
			/>
		</div>
	);
}
