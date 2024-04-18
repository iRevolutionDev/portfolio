import { Command } from "@/features/terminal/command";
import { terminal } from "@/features/terminal/terminal";

export class LsCommand extends Command {
	constructor() {
		super("ls", "List files and directories", []);
	}

	public execute(args: string[]) {
		if (args.length > 0) {
			terminal.error(`Command ${this.name} does not accept any arguments.`);
			return;
		}

		terminal.log(
			terminal.currentDirectory?.children.map((c) => c.name).join(" ") ?? "",
		);
	}
}
