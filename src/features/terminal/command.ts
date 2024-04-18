export class Command {
	constructor(
		public readonly name: string,
		public readonly description: string,
		public readonly args: string[] = [],
	) {}

	public help(): string {
		return `${this.name} - ${this.description}`;
	}

	public execute(args: string[]): void {
		throw new Error(`Command ${this.name} not implemented.`);
	}

	public toString(): string {
		return `${this.name} ${this.args.join(" ")}`;
	}
}
