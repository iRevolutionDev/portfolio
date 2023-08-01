import {USER} from "@/helpers/constants";
import ColorInterpreter from "@/helpers/color-intepreter";
import {Stack} from "@mui/material";
import {CommandInput} from "@/components/terminal/command-input";
import {FC} from "react";

type CommandLineProps = {
    onExecute: (command: string) => void
}

export const CommandLine: FC<CommandLineProps> = ({onExecute}) => {
    return (
        <Stack direction="row" spacing={1} className="w-full">
            <ColorInterpreter text={`[@red](${USER})[@blue](@localhost):[#ff0000](~)$`}/>
            <CommandInput onExecute={onExecute}/>
        </Stack>
    )
}