import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import IPv4Subnet from "../../components/IPv4Subnet";
import { debug } from "console";

describe("render IPv4Subnet", () => {
    test("input ipv4 address text", () => {
        render(<IPv4Subnet />);
        const inputValue = screen.getByRole("textbox") as HTMLInputElement;
        userEvent.type(inputValue, "192.168.0.1");
        expect(inputValue.value).toBe("192.168.0.1");
    });

    test("label text", () => {
        render(<IPv4Subnet />);
        const label = screen.getByLabelText("IPv4 address") as HTMLElement;
        expect(label).toBeInTheDocument();
    });
});
