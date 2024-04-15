import { File } from "@/features/terminal/system/file";
import type { Folder } from "@/features/terminal/system/folder";

export abstract class ExecutableFile extends File {
	protected constructor(name: string, parent: Folder) {
		super(name, parent, "");
	}

	get isExecutable() {
		return true;
	}

	get isDirectory() {
		return false;
	}

	execute() {
		throw new Error("Not implemented");
	}
}
