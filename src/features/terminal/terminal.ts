import {terminalEventDispatcher} from "@/features/terminal/terminal-event-dispatcher";
import {RootFolder} from "@/features/terminal/system/root-folder";
import {Folder} from "@/features/terminal/system/folder";

export class Terminal {
    public dispatcher = terminalEventDispatcher;

    public rootFolder?: RootFolder;

    public currentDirectory?: RootFolder;

    constructor() {
        this.dispatcher.on("cd", (path: string) => {

        });
    }

    public log(message: string): void {
        this.dispatcher.log(message);
    }

    public error(message: string): void {
        this.dispatcher.log(`[@red](Error: ${message})`);
    }

    public clear(): void {
        this.dispatcher.clear();
    }

    public setup(): void {
        this.rootFolder = new RootFolder([
            new Folder("projects"),
        ]);
        this.rootFolder.postInit();

        this.currentDirectory = this.rootFolder;
    }
}

export const terminal = new Terminal();