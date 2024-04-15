import type { Command } from "@/features/terminal/command";
import { terminal } from "@/features/terminal/terminal";

export class CommandManager {
	public static commands: Map<string, Command> = new Map<string, Command>();

	public static add(command: Command): void {
		this.commands.set(command.name, command);
	}

	public static addAll(commands: Command[]): void {
		commands.forEach((command) => this.add(command));
	}

	public static remove(command: Command): void {
		this.commands.delete(command.name);
	}

	public static get(command: string): Command | undefined {
		return this.commands.get(command);
	}

	public static clear(): void {
		this.commands.clear();
	}

	public static getCommands(): Command[] {
		return Array.from(this.commands.values());
	}

	public static execute(command: string) {
		const args = command.split(" ");
		terminal.log(`$ ${command}`);

		const cmd = this.get(args[0]);
		cmd
			? cmd.execute(args.slice(1))
			: terminal.error(`Command ${args[0]} not found.`);
	}
}
