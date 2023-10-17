import {terminalEventDispatcher} from "@/features/terminal/terminal-event-dispatcher";
import {RootFolder} from "@/features/terminal/system/root-folder";
import {TerminalStorage} from "@/features/terminal/terminal-storage";

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

    public warn(message: string): void {
        this.dispatcher.log(`[@yellow](Warning: ${message})`);
    }

    public info(message: string): void {
        this.dispatcher.log(`[@blue](Info: ${message})`);
    }

    public clear(): void {
        this.dispatcher.clear();
    }

    public setup(): void {
        this.rootFolder = new RootFolder();
        this.rootFolder.postInit();
        this.currentDirectory = this.rootFolder;
        new TerminalStorage(this);
    }

    public dispose(): void {
        this.rootFolder = undefined;
        this.currentDirectory = undefined;
    }
}

export const terminal = new Terminal();