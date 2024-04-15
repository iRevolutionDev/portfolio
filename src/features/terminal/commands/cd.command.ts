import { Command } from "@/features/terminal/command";
import { terminal } from "@/features/terminal/terminal";
import { terminalEventDispatcher } from "@/features/terminal/terminal-event-dispatcher";

export class CdCommand extends Command {
	constructor() {
		super("cd", "Change directory", ["path"]);
	}

	public execute(args: string[]) {
		if (args.length !== 1) {
			terminal.error(`Command ${this.name} requires exactly one argument.`);
			return;
		}

		const folder = terminal.getPath(args[0]);

		if (!folder) {
			terminal.error(`No such directory: ${args[0]}`);
			return;
		}

		if (!folder.hasPermission) {
			terminal.error(`You don't have permission to access this directory.`);
			return;
		}

		if (!folder.isDirectory) {
			terminal.error(`Not a directory: ${args[0]}`);
			return;
		}

		if (folder.isRoot) {
			terminalEventDispatcher.emit("onDirectoryChanged", "~");
			terminal.currentDirectory = folder;
			return;
		}

		folder.onOpen();
		terminalEventDispatcher.emit("onDirectoryChanged", folder.path);
		terminal.currentDirectory = folder;
	}
}
