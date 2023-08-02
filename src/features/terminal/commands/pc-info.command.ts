import {Command} from "@/features/terminal/command";
import {terminal} from "@/features/terminal/terminal";

export class PcInfoCommand extends Command {
    constructor() {
        super('pcinfo', 'Show information about your PC');
    }

    execute(): void {
        terminal.log('[@red](PC Information)');
        terminal.log('[@yellow](CPU): Ryzen 7 6800');
        terminal.log('[@yellow](GPU): NVIDIA GeForce RTX 3060 6GB');
        terminal.log('[@yellow](RAM): 16GB DDR4 4800MHz');
        terminal.log('[@yellow](Storage): 512GB NVMe SSD');
        terminal.log('[@yellow](OS): Windows 11 Pro');
    }
}