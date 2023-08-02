import React, {ReactNode, useCallback, useMemo} from "react";

/**
 * Retrieves the color class for a given color identifier.
 *
 * @param {string} colorIdentifier - The color identifier to retrieve the color class for.
 * @returns {string | undefined} The color class for the given color identifier, or undefined if the color identifier is invalid.
 */
const getColorClass = (colorIdentifier: string): string | undefined => {
    const sanitizedColorIdentifier = colorIdentifier.replace("@", "");
    if (/^[a-z]+$/.test(sanitizedColorIdentifier)) {
        console.log(`terminal-${sanitizedColorIdentifier}-color`);
        return `terminal-${sanitizedColorIdentifier}-color`;
    }
    // Default to black if the provided tailwind class is not valid
}

/**
 * Represents the properties of the ColorInterpreter component.
 *
 * @interface ColorInterpreterProps
 */
interface ColorInterpreterProps {
    text: string;
}

/**
 * A React functional component that interprets color codes within a text and renders them accordingly.
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to be interpreted.
 * @returns {ReactNode} The interpreted text with color codes rendered accordingly.
 */
const ColorInterpreter: React.FC<ColorInterpreterProps> = ({text}: { text: string; }): ReactNode => {
    const interpretColors = useCallback((inputText: string): ReactNode[] => {
        const pattern = /\[([@#][a-fA-F0-9]{3,6}|[@#]\w+)]\s*\((.*?)\)/g;
        const parts: ReactNode[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = pattern.exec(inputText)) !== null) {
            const [fullMatch, colorIdentifier, innerText] = match;
            const start = match.index;
            const end = start + fullMatch.length;

            if (start > lastIndex) {
                parts.push(inputText.substring(lastIndex, start));
            }

            const isHexColor = colorIdentifier.charAt(0) === "#";
            const colorClass = isHexColor ? colorIdentifier : getColorClass(colorIdentifier);

            parts.push(
                <span
                    key={`${colorClass}-${innerText}`}
                    className={isHexColor ? undefined : colorClass}
                    style={isHexColor ? {color: colorClass} : undefined}
                >
                    {innerText}
                </span>
            );

            lastIndex = end;
        }

        if (lastIndex < inputText.length) {
            parts.push(inputText.substring(lastIndex));
        }
        return parts;
    }, []);

    const interpretedText = useMemo(() => interpretColors(text), [text, interpretColors]);

    return <span>{interpretedText}</span>;
};

export default ColorInterpreter;