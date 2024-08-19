import type { Technology } from "@/@types/technology";
import {
	BiLogoCPlusPlus,
	BiLogoFlutter,
	BiLogoGit,
	BiLogoJavascript,
	BiLogoPhp,
	BiLogoPython,
	BiLogoReact,
	BiLogoTailwindCss,
	BiLogoTypescript,
} from "react-icons/bi";
import { FaJava } from "react-icons/fa";
import { SiCsharp, SiKotlin, SiLua, SiRust } from "react-icons/si";

export const Technologies: Technology[] = [
	{ name: "C++", icon: <BiLogoCPlusPlus fontSize={40} /> },
	{ name: "C#", icon: <SiCsharp fontSize={32} /> },
	{ name: "Rust", icon: <SiRust fontSize={32} /> },
	{ name: "Java", icon: <FaJava fontSize={32} /> },
	{ name: "Kotlin", icon: <SiKotlin fontSize={32} /> },
	{ name: "PHP", icon: <BiLogoPhp fontSize={40} /> },
	{ name: "Python", icon: <BiLogoPython fontSize={40} /> },
	{ name: "Flutter", icon: <BiLogoFlutter fontSize={40} /> },
	{ name: "Lua", icon: <SiLua fontSize={40} /> },
	{ name: "TypeScript", icon: <BiLogoTypescript fontSize={40} /> },
	{ name: "JavaScript", icon: <BiLogoJavascript fontSize={40} /> },
	{ name: "React", icon: <BiLogoReact fontSize={40} /> },
	{ name: "TailwindCSS", icon: <BiLogoTailwindCss fontSize={40} /> },
	{ name: "Git", icon: <BiLogoGit fontSize={40} /> },
];
