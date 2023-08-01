export class TerminalEventDispatcher {
    public events: Map<string, Function[]> = new Map<string, Function[]>();

    constructor() {
    }

    public on(event: string, callback: Function): void {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)?.push(callback);
    }

    public emit(event: string, ...args: any[]): void {
        if (!this.events.has(event)) {
            return;
        }
        this.events.get(event)?.forEach(callback => callback(...args));
    }

    public removeListener(event: string, callback: Function): void {
        if (!this.events.has(event)) {
            return;
        }
        const callbacks = this.events.get(event);
        const index = callbacks?.indexOf(callback);
        if (index !== undefined && index !== -1) {
            callbacks?.splice(index, 1);
        }
    }

    public removeAllListeners(event: string): void {
        if (!this.events.has(event)) {
            return;
        }
        this.events.delete(event);
    }

    public once(event: string, callback: Function): void {
        const onceCallback = (...args: any[]) => {
            this.removeListener(event, onceCallback);
            callback(...args);
        };
        this.on(event, onceCallback);
    }

    public dispose(): void {
        this.events.clear();
    }

    public log(message: string): void {
        this.emit('log', message);
    }

    public clear(): void {
        this.emit('clear');
    }
}

export const terminalEventDispatcher = new TerminalEventDispatcher();