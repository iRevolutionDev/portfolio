'use client';
import {Terminal} from "@/components/terminal/terminal";
import {commands} from "@/features/terminal/commands-register";

export default function Page() {
    return (
        <div className="p-4 h-full">
            <Terminal
                commands={commands}
            />
        </div>
    )
}