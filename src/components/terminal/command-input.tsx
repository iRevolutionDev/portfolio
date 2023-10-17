import React, {FC, useEffect, useState} from "react";

type CommandInputProps = {
    onExecute: (command: string) => void
}

export const CommandInput: FC<CommandInputProps> = ({onExecute}) => {
    const [command, setCommand] = useState<string>("")
    const inputRef = React.createRef<HTMLInputElement>()

    useEffect(() => {
        window.addEventListener('click', () => {
            inputRef.current?.focus()
        })

        return () => {
            window.removeEventListener('click', () => {
                inputRef.current?.focus()
            })
        }
    }, [inputRef])

    const sendCommand = () => {
        if (command.length <= 0) return

        onExecute(command)
        setCommand("")
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            sendCommand()
        }
    }

    return (
        <input type="text" className="bg-transparent outline-none border-none w-full h-full ml-2"
               value={command} onChange={e => setCommand(e.target.value)}
               onKeyDown={onKeyDown} ref={inputRef} autoFocus={true} spellCheck={false}
        />
    )
}