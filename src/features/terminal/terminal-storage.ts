import {Terminal} from "@/features/terminal/terminal";
import {Folder} from "@/features/terminal/system/folder";
import {GitDirectory} from "@/features/terminal/io/git-directory";
import {Repositories} from "@/@types/github-repo";

export class TerminalStorage {
    constructor(private terminal: Terminal) {
        this.setup()
            .catch(e => this.terminal.error(e.message));
    }

    private async setup() {
        this.terminal.rootFolder?.addChild(
            new Folder("projects", await this.getProjects())
        );
    }

    private async getProjects(): Promise<Array<GitDirectory>> {
        const response = await fetch("https://api.github.com/users/irevolutiondev/repos")
        if (!response.ok) {
            this.terminal.error(`Failed to fetch projects: ${response.statusText}`);
            return [];
        }

        const data = await response.json();

        if (data.message) {
            this.terminal.error(`Failed to fetch projects: ${data.message}`);
            return [];
        }

        return (data as Repositories).map(repo => new GitDirectory(repo.full_name));
    }
}