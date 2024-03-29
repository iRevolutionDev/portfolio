'use client';
import "@/components/terminal/colors.css"
import "@/components/terminal/terminal.css"
import {FC, useEffect} from "react";
import {CommandManager} from "@/features/terminal/command-manager";
import {CommandLine} from "@/components/terminal/command-line";
import {Stack} from "@mui/material";
import {Command} from "@/features/terminal/command";
import ColorInterpreter from "@/helpers/color-intepreter";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {clearTerminal, initTerminal, printTerminal} from "@/redux/features/terminal-slice";
import {terminalEventDispatcher} from "@/features/terminal/terminal-event-dispatcher";
import {terminal} from "@/features/terminal/terminal";

type TerminalProps = {
    commands?: Command[],
    welcomeMessage?: string,
    prompt: string
}

export const Terminal: FC<TerminalProps> = ({welcomeMessage, prompt, commands}) => {
    const {output, initialized} = useAppSelector(state => state.terminal)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!initialized) sendMessage(welcomeMessage ?? '');

        dispatch(initTerminal());

        CommandManager.addAll(commands ?? [])

        terminalEventDispatcher.on('clear', clear)
        terminalEventDispatcher.on('log', sendMessage)

        terminal.setup();

        return () => {
            CommandManager.clear()
            terminalEventDispatcher.dispose()
            terminal.dispose()
        }
    }, [])

    const onExecute = (command: string) => {
        CommandManager.execute(command)
    }

    const clear = () => {
        dispatch(clearTerminal());
    }

    const sendMessage = (message: string) => {
        dispatch(printTerminal(message));
    }

    return (
        <Stack direction="column" spacing={1} className="w-full h-full overflow-x-hidden">
            {output.map((line, index) => (
                <ColorInterpreter key={index} text={line} className="terminal-output"/>
            ))}
            <CommandLine prompt={prompt} onExecute={onExecute}/>
        </Stack>
    )
}