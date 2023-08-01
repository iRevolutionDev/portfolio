import {terminalEventDispatcher} from "@/features/terminal/terminal-event-dispatcher";

export class Terminal {
    public dispatcher = terminalEventDispatcher;

    constructor() {
    }

    public log(message: string): void {
        this.dispatcher.log(message);
    }

    public error(message: string): void {
        this.dispatcher.log(`[@red](Error: ${message})`);
    }

    public clear(): void {
        this.dispatcher.clear();
    }
}

export const terminal = new Terminal();