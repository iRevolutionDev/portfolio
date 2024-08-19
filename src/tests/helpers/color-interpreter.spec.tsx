import ColorInterpreter from "@/helpers/color-interpreter";
import { cleanup, render, screen } from "@testing-library/react";

afterEach(cleanup);

describe("ColorInterpreter", () => {
	it("renders text without color codes correctly", () => {
		render(<ColorInterpreter text="Hello World" />);
		expect(screen.getByText("Hello World")).toBeInTheDocument();
	});

	it("renders text with hex color codes correctly", () => {
		render(<ColorInterpreter text="[#ff0000](Hello) World" />);
		const coloredText = screen.getByText("Hello");
		expect(coloredText).toBeInTheDocument();
		expect(coloredText).toHaveStyle("color: #ff0000");
	});

	it("renders text with invalid color codes as plain text", () => {
		render(<ColorInterpreter text="[invalid](Hello) World" />);
		expect(screen.getByText("[invalid](Hello) World")).toBeInTheDocument();
	});
});
