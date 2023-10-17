import {File} from "@/features/terminal/system/file";
import {RootFolder} from "@/features/terminal/system/root-folder";

export class Folder {
    hash: string;
    name: string;
    parent?: Folder | null;
    children: Array<Folder | File>;
    initialized: boolean = false;
    hasPermission: boolean = true;

    constructor(name?: string, children?: Array<Folder | File>, parent?: Folder | null) {
        this.hash = Math.random().toString(36).substring(2, 9);
        this.name = name || "";
        this.parent = parent || null;
        this.children = children || [];

        this.init();

        this.initialized = true;
    }

    get path(): string {
        if (this.parent) {
            return `${this.parent.path}/${this.name}`;
        }
        return this instanceof RootFolder ? "~" : this.name;
    }

    get childrenCount() {
        return this.children.length;
    }

    get childrenNames() {
        return this.children.map(c => c.name);
    }

    get isRoot() {
        return !this.parent;
    }

    get isDirectory() {
        return true;
    }

    get isFile() {
        return false;
    }

    public getFolder(name: string): Folder | undefined {
        return this.children.find(c => c.name === name && c.isDirectory) as Folder;
    }

    init() {
        this.children.forEach(child => {
            if (child instanceof Folder) {
                child.parent = this;
                if (!child.initialized) child.init();
            }
        });
    }

    postInit() {
        this.children.forEach(child => {
            if (child instanceof Folder) {
                child.parent = this;
                child.postInit();
            }
        });
    }

    addChild(child: Folder | File) {
        if (child instanceof Folder) child.parent = this;
        this.children.push(child);
    }

    findChild(name: string) {
        return this.children.find(c => c.name === name);
    }

    findFile(name: string) {
        return this.children.find(c => c.name === name && c.isFile);
    }

    removeChild(name: string) {
        const index = this.children.findIndex(c => c.name === name);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    remove() {
        if (this.parent) {
            this.parent.removeChild(this.name);
        }
    }

    setHasPermission(hasPermission: boolean) {
        this.hasPermission = hasPermission;
    }

    onOpen() {
    }

    toString() {
        return this.name;
    }
}