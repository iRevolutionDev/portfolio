'use client';
import {Terminal} from "@/components/terminal/terminal";
import {commands} from "@/features/terminal/commands-register";
import {USER} from "@/helpers/constants";

export default function Page() {
    return (
        <div className="p-4 h-full">
            <Terminal
                commands={commands}
                prompt={`[@red](${USER})[@blue](@localhost):[#ff0000](~)$`}
            />
        </div>
    )
}