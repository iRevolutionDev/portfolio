import React, { type FC, type ReactNode, useCallback, useMemo } from "react";

/**
 * Retrieves the color class for a given color identifier.
 *
 * @param {string} colorIdentifier - The color identifier to retrieve the color class for.
 * @returns {string | undefined} The color class for the given color identifier, or undefined if the color identifier is invalid.
 */
const getColorClass = (colorIdentifier: string): string | undefined => {
	const sanitizedColorIdentifier = colorIdentifier.replace("@", "");
	if (/^[a-z]+$/.test(sanitizedColorIdentifier))
		return `terminal-${sanitizedColorIdentifier}-color`;
	// Default to black if the provided tailwind class is not valid
};

/**
 * Represents the properties of the ColorInterpreter component.
 *
 * @interface ColorInterpreterProps
 */
interface ColorInterpreterProps {
	text: string;
	className?: string;
}

const interpretLineBreaks = (inputText: string): string[] => {
	return inputText.split("\n").filter((line) => line !== "");
};

/**
 * A React functional component that interprets color codes within a text and renders them accordingly.
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to be interpreted.
 * @param {string} props.className - The class name to be applied to the rendered text.
 * @returns {ReactNode} The interpreted text with color codes rendered accordingly.
 */
const ColorInterpreter: FC<ColorInterpreterProps> = ({
	text,
	className,
}: { text: string; className?: string }): ReactNode => {
	const interpretColors = useCallback((inputText: string): ReactNode[] => {
		// Add Line Break Interpretation
		const lines = interpretLineBreaks(inputText);
		return lines.flatMap((line, lineIdx) => {
			const pattern = /\[([@#][a-fA-F0-9]{3,6}|[@#]\w+)]\s*\((.*?)\)/g;
			const parts: ReactNode[] = [];
			let lastIndex = 0;
			let match = pattern.exec(line);

			while (match !== null) {
				const [fullMatch, colorIdentifier, innerText] = match;
				const start = match.index;
				const end = start + fullMatch.length;

				if (start > lastIndex) {
					parts.push(line.substring(lastIndex, start));
				}

				const isHexColor = colorIdentifier.charAt(0) === "#";
				const colorClass = isHexColor
					? colorIdentifier
					: getColorClass(colorIdentifier);

				parts.push(
					<span
						key={`${colorClass}-${innerText}`} // modified key to include lineIdx
						className={isHexColor ? undefined : colorClass}
						style={isHexColor ? { color: colorClass } : undefined}
					>
						{innerText}
					</span>,
				);

				lastIndex = end;
				match = pattern.exec(line);
			}

			if (lastIndex < line.length) {
				parts.push(line.substring(lastIndex));
			}
			return <pre>{parts}</pre>;
		});
	}, []);

	const interpretedText = useMemo(
		() => interpretColors(text),
		[text, interpretColors],
	);

	// Render as a div to nest <p> tags
	return (
		<div key={text} className={className}>
			{interpretedText}
		</div>
	);
};

export default ColorInterpreter;
