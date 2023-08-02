import {CdCommand, ClearCommand, HelpCommand, LsCommand, PcInfoCommand} from "@/features/terminal/commands";

export const commands = [
    new HelpCommand(),
    new ClearCommand(),
    new LsCommand(),
    new CdCommand(),
    new PcInfoCommand()
];