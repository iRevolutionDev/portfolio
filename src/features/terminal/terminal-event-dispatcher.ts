export type TerminalEventFunction = (...args: unknown[]) => void;

export class TerminalEventDispatcher {
	public events: Map<string, TerminalEventFunction[]> = new Map<
		string,
		TerminalEventFunction[]
	>();

	public on(event: string, callback: TerminalEventFunction): void {
		if (!this.events.has(event)) {
			this.events.set(event, []);
		}
		this.events.get(event)?.push(callback);
	}

	public emit(event: string, ...args: unknown[]): void {
		if (!this.events.has(event)) {
			return;
		}

		const callbacks = this.events.get(event);
		for (const callback of callbacks || []) {
			callback(...args);
		}
	}

	public removeListener(event: string, callback: TerminalEventFunction): void {
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

	public once(event: string, callback: TerminalEventFunction): void {
		const onceCallback = (...args: unknown[]) => {
			callback(...args);
			this.removeListener(event, onceCallback);
		};
		this.on(event, onceCallback);
	}

	public dispose(): void {
		this.events.clear();
	}

	public log(message: string): void {
		this.emit("log", message);
	}

	public clear(): void {
		this.emit("clear");
	}
}

export const terminalEventDispatcher = new TerminalEventDispatcher();
