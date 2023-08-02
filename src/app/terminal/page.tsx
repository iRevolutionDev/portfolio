'use client';
import {Terminal} from "@/components/terminal/terminal";
import {commands} from "@/features/terminal/commands-register";
import {HOST} from "@/helpers/constants";

export default function Page() {
    return (
        <div className="p-4 h-full">
            <Terminal
                commands={commands}
                prompt={`[@red](${HOST})[@blue](@localhost):[#ff0000](~)$`}
                welcomeMessage={`
$$$$$$$\\                                $$\\             $$\\     $$\\                     
$$  __$$\\                               $$ |            $$ |    \\__|                    
$$ |  $$ | $$$$$$\\ $$\\    $$\\  $$$$$$\\  $$ |$$\\   $$\\ $$$$$$\\   $$\\  $$$$$$\\  $$$$$$$\\  
$$$$$$$  |$$  __$$\\\\$$\\  $$  |$$  __$$\\ $$ |$$ |  $$ |\\_$$  _|  $$ |$$  __$$\\ $$  __$$\\ 
$$  __$$< $$$$$$$$ |\\$$\\$$  / $$ /  $$ |$$ |$$ |  $$ |  $$ |    $$ |$$ /  $$ |$$ |  $$ |
$$ |  $$ |$$   ____| \\$$$  /  $$ |  $$ |$$ |$$ |  $$ |  $$ |$$\\ $$ |$$ |  $$ |$$ |  $$ |
$$ |  $$ |\\$$$$$$$\\   \\$  /   \\$$$$$$  |$$ |\\$$$$$$  |  \\$$$$  |$$ |\\$$$$$$  |$$ |  $$ |
\\__|  \\__| \\_______|   \\_/     \\______/ \\__| \\______/    \\____/ \\__| \\______/ \\__|  \\__|
Welcome to my website! Type 'help' to get started.
               `}
            />
        </div>
    )
}