import type { Command } from "@/features/terminal/command";
import { terminal } from "@/features/terminal/terminal";

export class CommandManager {
	public commands: Map<string, Command> = new Map<string, Command>();

	public add(command: Command): void {
		this.commands.set(command.name, command);
	}

	public addAll(commands: Command[]): void {
		for (const command of commands) {
			this.add(command);
		}
	}

	public remove(command: Command): void {
		this.commands.delete(command.name);
	}

	public get(command: string): Command | undefined {
		return this.commands.get(command);
	}

	public clear(): void {
		this.commands.clear();
	}

	public getCommands(): Command[] {
		return Array.from(this.commands.values());
	}

	public execute(command: string) {
		const args = command.split(" ");
		terminal.log(`$ ${command}`);

		const cmd = this.get(args[0]);
		cmd
			? cmd.execute(args.slice(1))
			: terminal.error(`Command ${args[0]} not found.`);
	}
}

export const commandManager = new CommandManager();
