import {Command} from "@/features/terminal/command";
import {terminal} from "@/features/terminal/terminal";
import {Folder} from "@/features/terminal/system/folder";
import {terminalEventDispatcher} from "@/features/terminal/terminal-event-dispatcher";

export class CdCommand extends Command {
    constructor() {
        super("cd", "Change directory", ["path"]);
    }

    public execute(args: string[]) {
        if (args.length !== 1) {
            terminal.error(`Command ${this.name} requires exactly one argument.`);
            return;
        }

        const path = args[0];

        if (path === "..") {
            if (terminal.currentDirectory?.name === "home") {
                terminal.error(`You don't have permission to access this directory.`);
                return;
            }

            terminalEventDispatcher.emit("onDirectoryChanged", terminal.currentDirectory?.parent?.path ?? "~")
            terminal.currentDirectory = terminal.currentDirectory?.parent as Folder;
            return;
        }

        const folder = terminal.currentDirectory?.children.find(c => c.name === path && c.isDirectory) as Folder | undefined;

        if (!folder) {
            terminal.error(`No such directory: ${path}`);
            return;
        }

        terminalEventDispatcher.emit("onDirectoryChanged", folder.path)
        terminal.currentDirectory = folder;
    }
}