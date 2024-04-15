import {
	CdCommand,
	ClearCommand,
	HelpCommand,
	LsCommand,
	PcInfoCommand,
} from "@/features/terminal/commands";
import { VSCodeCommand } from "@/features/terminal/commands/code.command";

export const commands = [
	new HelpCommand(),
	new ClearCommand(),
	new LsCommand(),
	new CdCommand(),
	new PcInfoCommand(),
	new VSCodeCommand(),
];
