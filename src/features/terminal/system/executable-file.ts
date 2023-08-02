import {File} from "@/features/terminal/system/file";
import {Folder} from "@/features/terminal/system/folder";

export class ExecutableFile extends File {
    constructor(name: string, parent: Folder) {
        super(name, parent, ".sh");
    }

    get isExecutable() {
        return true;
    }

    get isDirectory() {
        return false;
    }
}