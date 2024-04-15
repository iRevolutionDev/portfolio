import { Command } from "@/features/terminal/command";
import { terminal } from "@/features/terminal/terminal";

export class HelpCommand extends Command {
	public constructor() {
		super("help", "A help command", ["command"]);
	}

	public execute(args: string[]) {
		if (args.length > 0) {
			const command = this.commandManager.get(args[0]);
			if (!command) {
				terminal.error(`Command ${args[0]} not found.`);
				return;
			}

			terminal.log(command.help());
			return;
		}

		terminal.log("Available commands:");
		for (const command of this.commandManager.getCommands()) {
			terminal.log(`- ${command.name}`);
		}

		terminal.log(
			"Use 'help <command>' to get more information about a command.",
		);
	}

	public help(): string {
		return "This is the help command";
	}
}
