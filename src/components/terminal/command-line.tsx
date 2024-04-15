import { CommandInput } from "@/components/terminal/command-input";
import ColorInterpreter from "@/helpers/color-intepreter";
import { Stack } from "@mui/material";
import type { FC } from "react";

type CommandLineProps = {
	prompt: string;
	onExecute: (command: string) => void;
};

export const CommandLine: FC<CommandLineProps> = ({ prompt, onExecute }) => {
	return (
		<Stack direction="row" spacing={1} className="w-full">
			<ColorInterpreter text={prompt} />
			<CommandInput onExecute={onExecute} />
		</Stack>
	);
};
