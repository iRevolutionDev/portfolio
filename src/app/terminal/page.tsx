'use client';
import {Terminal} from "@/components/terminal/terminal";
import {commands} from "@/features/terminal/commands-register";
import {HOST, WELCOME_MESSAGE} from "@/helpers/constants";

export default function Page() {
    return (
        <div className="p-4 h-full">
            <Terminal
                commands={commands}
                prompt={`[@green](${HOST}@localhost):[#ff0000](~)$`}
                welcomeMessage={WELCOME_MESSAGE}
            />
        </div>
    )
}