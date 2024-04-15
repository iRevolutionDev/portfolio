import { Command } from "@/features/terminal/command";
import { terminal } from "@/features/terminal/terminal";

export class ClearCommand extends Command {
	constructor() {
		super("clear", "Clears the terminal", []);
	}

	execute() {
		terminal.clear();
	}
}
