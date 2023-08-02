import {Folder} from "@/features/terminal/system/folder";

export class File {
    public name: string;
    public extension: string;
    public parent: Folder;

    constructor(name: string, parent: Folder, extension: string) {
        this.name = name;
        this.extension = extension;
        this.parent = parent;
    }

    get isDirectory() {
        return false;
    }

    get isFile() {
        return true;
    }

    get path() {
        return `${this.name}.${this.extension}`;
    }

    toString() {
        return this.name;
    }
}