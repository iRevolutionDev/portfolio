import {Command} from "@/features/terminal/command";
import {terminal} from "@/features/terminal/terminal";
import {USER} from "@/constants/github";
import {GitDirectory} from "@/features/terminal/io/git-directory";

export class VSCodeCommand extends Command {
    constructor() {
        super("code", "Opens VS Code", []);
    }

    public execute(args: string[]) {
        if (args.length === 0) {
            terminal.info("Please provide a file path");
            return;
        }

        const folder = terminal.getPath(args[0]);

        if (!folder) {
            terminal.error("Folder not found");
            return;
        }

        if (folder.isFile) {
            terminal.error("Cannot open a file");
            return;
        }

        if (!(folder instanceof GitDirectory)) {
            terminal.error("Cannot open a non-git folder");
            return;
        }

        this.openWindow(folder.name);
    }

    public help(): string {
        return "Opens VS Code";
    }

    private openWindow(repository: string) {
        window.open(`https://github1s.com/${USER}/${repository}`);
    }
}