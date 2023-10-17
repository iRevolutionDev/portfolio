import {Folder} from "@/features/terminal/system/folder";
import {File} from "@/features/terminal/system/file";
import {terminal} from "@/features/terminal/terminal";

export class GitDirectory extends Folder {
    hasCachedChildren: boolean = false;

    constructor(private url: string) {
        super();

        this.name = url.split("/").pop() || "";
    }

    get isProjectDirectory() {
        return true;
    }

    init() {
        super.init();
    }

    onOpen() {
        if (this.hasCachedChildren) return;

        this.fetchProjectDirectory(this.url).then((data) => {
            if (data.length === 0) return;

            this.children = data?.map((item) => {
                switch (item.type) {
                    case "dir":
                        return new Folder(item.name, [], this);
                    case "file":
                        return new File(item.name, this, "");
                    default:
                        return new File(item.name, this, "");
                }
            });
        });

        this.hasCachedChildren = true;
    }

    async fetchProjectDirectory(url: string): Promise<Array<GitHubFile>> {
        const response = await fetch(`https://api.github.com/repos/${url}/contents`);
        if (!response.ok) {
            terminal.error(`Failed to fetch project directory: ${response.statusText}`);
            return [];
        }

        const data = await response.json();

        if (data.message) {
            terminal.error(`Failed to fetch project directory: ${data.message}`);
            return [];
        }

        return data;
    }
}