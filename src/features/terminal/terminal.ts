import type { Folder } from "@/features/terminal/system/folder";
import { RootFolder } from "@/features/terminal/system/root-folder";
import { terminalEventDispatcher } from "@/features/terminal/terminal-event-dispatcher";
import { TerminalStorage } from "@/features/terminal/terminal-storage";

export class Terminal {
	public dispatcher = terminalEventDispatcher;

	public rootFolder?: RootFolder;
	public currentDirectory?: RootFolder;

	constructor() {
		this.dispatcher.on("cd", (path: string) => {});
	}

	public getPath(path: string): Folder | null | undefined {
		if (
			!this.rootFolder ||
			(path.startsWith("../") && this.currentDirectory?.isRoot)
		) {
			return null;
		}

		if (path === "~" || path === "/") {
			return this.rootFolder;
		}

		if (path.startsWith("/") || path.startsWith("~")) {
			return this.getPath(path.substring(1));
		}

		if (path.startsWith("./") || path.startsWith(".")) {
			return this.getPath(
				`${this.currentDirectory?.path}/${path.substring(
					path.startsWith("./") ? 2 : 1,
				)}`,
			);
		}

		if (path.startsWith("../") || path.startsWith("..")) {
			return this.getPath(
				`${this.currentDirectory?.parent?.path}/${path.substring(
					path.startsWith("../") ? 3 : 2,
				)}`,
			);
		}

		return this.retrieveFolderFromPath(path);
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

	private retrieveFolderFromPath(path: string): Folder | undefined | null {
		const folders = path.split("/");
		let folder = this.currentDirectory;

		for (const folderName of folders) {
			if (!folder || !folder.hasPermission) {
				return null;
			}

			folder = folder.getFolder(folderName);
		}

		return folder;
	}
}

export const terminal = new Terminal();
