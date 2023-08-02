import {Folder} from "@/features/terminal/system/folder";
import {File} from "@/features/terminal/system/file";

export class RootFolder extends Folder {
    constructor(children: Array<Folder | File> = []) {
        super("home", children);
    }

    get isRoot() {
        return true;
    }
}