import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "../../components/Header";

describe("render Header", () => {
    test("header text", () => {
        render(<Header />);
        screen.debug();
        expect(screen.getByText("IP Subnet Calculator")).toBeInTheDocument();
    });
});
