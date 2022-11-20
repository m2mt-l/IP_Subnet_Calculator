import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import IPv6Subnet from "../../components/IPv4Subnet";

describe("render IPv6 input", () => {
    test("input ipv6 address text", () => {
        render(<IPv6Subnet />);
        const inputValue = screen.getByRole("textbox") as HTMLInputElement;
        userEvent.type(inputValue, "2001:db8::1");
        expect(inputValue.value).toBe("2001:db8::1");
    });
});
