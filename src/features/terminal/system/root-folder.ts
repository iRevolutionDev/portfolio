import type { File } from "@/features/terminal/system/file";
import { Folder } from "@/features/terminal/system/folder";

export class RootFolder extends Folder {
	constructor(children: Array<Folder | File> = []) {
		super("home", children);
	}

	get isRoot() {
		return true;
	}
}
