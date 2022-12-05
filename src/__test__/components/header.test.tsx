import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import Header from "../../components/pages/Header";

describe("render Header", () => {
    test("header text", () => {
        render(<Header />);
        expect(screen.getByText("IP Subnet Calculator")).toBeInTheDocument();
    });
});
