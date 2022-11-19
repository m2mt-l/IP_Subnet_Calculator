import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import IPv4Input from "../../components/IPv4Input";

describe("render IPv4 input", () => {
    test("input ipv4 address text", () => {
        render(<IPv4Input />);
        const inputValue = screen.getByRole("textbox") as HTMLInputElement;
        userEvent.type(inputValue, "192.168.0.1");
        expect(inputValue.value).toBe("192.168.0.1");
    });
});
