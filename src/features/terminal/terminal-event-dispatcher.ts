export type TerminalEventFunction<T = unknown> = (...args: T[]) => void;

export class TerminalEventDispatcher {
	public events = new Map<string, Array<TerminalEventFunction>>();

	public on<T = unknown>(
		event: string,
		callback: TerminalEventFunction<T>,
	): void {
		if (!this.events.has(event)) {
			this.events.set(event, []);
		}
		this.events.get(event)?.push(callback as TerminalEventFunction);
	}

	public emit<T = unknown>(event: string, ...args: T[]) {
		if (!this.events.has(event)) {
			return;
		}
		const callbacks = this.events.get(event);
		for (const callback of callbacks || []) {
			callback(...args);
		}
	}

	public removeListener(event: string, callback: TerminalEventFunction) {
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

	public once(event: string, callback: TerminalEventFunction) {
		const onceCallback = (...args: unknown[]) => {
			callback(...args);
			this.removeListener(event, onceCallback);
		};
		this.on(event, onceCallback);
	}

	public dispose(): void {
		this.events.clear();
	}

	public log(message: string) {
		this.emit("log", message);
	}

	public clear() {
		this.emit("clear");
	}
}

export const terminalEventDispatcher = new TerminalEventDispatcher();
