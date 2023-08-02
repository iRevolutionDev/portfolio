import {CdCommand, ClearCommand, HelpCommand, LsCommand} from "@/features/terminal/commands";

export const commands = [
    new HelpCommand(),
    new ClearCommand(),
    new LsCommand(),
    new CdCommand()
];