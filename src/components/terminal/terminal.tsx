"use client";
import "@/components/terminal/colors.css";
import { CommandLine } from "@/components/terminal/command-line";
import "@/components/terminal/terminal.css";
import type { Command } from "@/features/terminal/command";
import { commandManager } from "@/features/terminal/command-manager";
import { terminal } from "@/features/terminal/terminal";
import { terminalEventDispatcher } from "@/features/terminal/terminal-event-dispatcher";
import ColorInterpreter from "@/helpers/color-intepreter";
import {
	clearTerminal,
	initTerminal,
	printTerminal,
} from "@/redux/features/terminal-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Stack } from "@mui/material";
import { type FC, useEffect } from "react";

type TerminalProps = {
	commands?: Command[];
	welcomeMessage?: string;
	prompt: string;
};

export const Terminal: FC<TerminalProps> = ({
	welcomeMessage,
	prompt,
	commands,
}) => {
	const { output, initialized } = useAppSelector((state) => state.terminal);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!initialized) sendMessage(welcomeMessage ?? "");

		dispatch(initTerminal());

		commandManager.addAll(commands ?? []);

		terminalEventDispatcher.on("clear", clear);
		terminalEventDispatcher.on("log", sendMessage);

		terminal.setup();

		return () => {
			commandManager.clear();
			terminalEventDispatcher.dispose();
			terminal.dispose();
		};
	}, [commands, dispatch, initialized, welcomeMessage]);

	const onExecute = (command: string) => {
		commandManager.execute(command);
	};

	const clear = () => {
		dispatch(clearTerminal());
	};

	const sendMessage = (message: string) => {
		dispatch(printTerminal(message));
	};

	return (
		<Stack
			direction="column"
			spacing={1}
			className="w-full h-full overflow-x-hidden"
		>
			{output.map((line) => (
				<ColorInterpreter text={line} className="terminal-output" />
			))}
			<CommandLine prompt={prompt} onExecute={onExecute} />
		</Stack>
	);
};
