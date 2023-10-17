import {terminalEventDispatcher} from "@/features/terminal/terminal-event-dispatcher";
import {RootFolder} from "@/features/terminal/system/root-folder";
import {TerminalStorage} from "@/features/terminal/terminal-storage";
import {Folder} from "@/features/terminal/system/folder";

export class Terminal {
    public dispatcher = terminalEventDispatcher;

    public rootFolder?: RootFolder;
    public currentDirectory?: RootFolder;

    constructor() {
        this.dispatcher.on("cd", (path: string) => {

        });
    }

    public getPath(path: string): Folder | null | undefined {
        if (!this.rootFolder) return null;

        if (path === "~") return this.rootFolder;

        if (path === "/") return this.rootFolder;

        if (path.startsWith("/")) {
            path = path.substring(1);
            return this.getPath(path);
        }

        if (path.startsWith("~")) {
            path = path.substring(1);
            return this.getPath(path);
        }

        if (path.startsWith("./")) {
            path = path.substring(2);
            return this.getPath(`${this.currentDirectory?.path}/${path}`);
        }

        if (path.startsWith("../")) {
            if (this.currentDirectory?.isRoot) return null;

            path = path.substring(3);
            return this.getPath(`${this.currentDirectory?.parent?.path}/${path}`);
        }

        if (path.startsWith("..")) {
            if (this.currentDirectory?.isRoot) return null;

            path = path.substring(2);
            return this.getPath(`${this.currentDirectory?.parent?.path}/${path}`);
        }

        if (path.startsWith(".")) {
            path = path.substring(1);
            return this.getPath(`${this.currentDirectory?.path}/${path}`);
        }

        const folders = path.split("/");
        let folder: Folder | undefined = this.rootFolder;

        for (const folderName of folders) {
            if (!folder) return undefined;

            folder = folder.getFolder(folderName);
        }

        return folder;
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