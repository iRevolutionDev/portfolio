import { Card, Stack, Tooltip } from "@mui/material";
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

export function TechnologyList() {
	return (
		<Card
			className="p-2"
			elevation={0}
			sx={{ borderRadius: 10 }}
			variant="outlined"
		>
			<Stack
				direction="row"
				flexWrap="wrap"
				spacing={2}
				alignContent="center"
				alignItems="center"
				justifyContent="center"
			>
				<Tooltip title="C++" arrow>
					<BiLogoCPlusPlus fontSize={40} />
				</Tooltip>
				<Tooltip title="C#" arrow>
					<SiCsharp fontSize={32} />
				</Tooltip>
				<Tooltip title="Rust" arrow>
					<SiRust fontSize={32} />
				</Tooltip>
				<Tooltip title="Java" arrow>
					<FaJava fontSize={32} />
				</Tooltip>
				<Tooltip title="Kotlin" arrow>
					<SiKotlin fontSize={32} />
				</Tooltip>
				<Tooltip title="PHP" arrow>
					<BiLogoPhp fontSize={40} />
				</Tooltip>
				<Tooltip title="Python" arrow>
					<BiLogoPython fontSize={40} />
				</Tooltip>
				<Tooltip title="Flutter" arrow>
					<BiLogoFlutter fontSize={40} />
				</Tooltip>
				<Tooltip title="Lua" arrow>
					<SiLua fontSize={40} />
				</Tooltip>
				<Tooltip title="Typescript" arrow>
					<BiLogoTypescript fontSize={40} />
				</Tooltip>
				<Tooltip title="Javascript" arrow>
					<BiLogoJavascript fontSize={40} />
				</Tooltip>
				<Tooltip title="React" arrow>
					<BiLogoReact fontSize={40} />
				</Tooltip>
				<Tooltip title="TailwindCSS" arrow>
					<BiLogoTailwindCss fontSize={40} />
				</Tooltip>
				<Tooltip title="Git" arrow>
					<BiLogoGit fontSize={40} />
				</Tooltip>
			</Stack>
		</Card>
	);
}
