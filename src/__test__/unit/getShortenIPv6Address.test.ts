import { getShortenIPv6Address } from "../../util/ipv6CalculatorUtil";

describe("getShortenIPv6Address", () => {
    const defaultRoute: string[] = ["0000", "0000", "0000", "0000", "0000", "0000", "0000", "0000"];
    const defaultRouteOutput: string[] = ["", "", ""];

    // 96
    const ninetySixZeroBits: string[] = [
        "2001",
        "0db8",
        "0000",
        "0000",
        "0000",
        "0000",
        "0000",
        "0000",
    ];
    const ninetySixZeroOutput: string[] = ["2001", "db8", "", ""];

    // 80
    const eightyZeroBits: string[] = [
        "2001",
        "0db8",
        "beef",
        "0000",
        "0000",
        "0000",
        "0000",
        "0000",
    ];
    const eightyZeroOutput: string[] = ["2001", "db8", "beef", "", ""];

    // middle 32
    const middleThirtyTwoZero: string[] = [
        "2001",
        "0db8",
        "beef",
        "0000",
        "0000",
        "9abc",
        "00de",
        "000f",
    ];
    const middleThirtyOutput: string[] = ["2001", "db8", "beef", "", "9abc", "de", "f"];

    // end 16
    const endSixTeenZeroBits: string[] = [
        "2001",
        "db8",
        "beef",
        "1234",
        "5678",
        "9abc",
        "00de",
        "0000",
    ];
    const endSixTeenZeroOutput: string[] = [
        "2001",
        "db8",
        "beef",
        "1234",
        "5678",
        "9abc",
        "de",
        "0",
    ];

    // no zero bit octet
    const noZeroBitOctet: string[] = [
        "2001",
        "0db8",
        "beef",
        "1234",
        "5678",
        "9abc",
        "00de",
        "000f",
    ];
    const noZeroBitOutput: string[] = ["2001", "db8", "beef", "1234", "5678", "9abc", "de", "f"];

    test("default route", () => {
        expect(getShortenIPv6Address(defaultRoute)).toEqual(defaultRouteOutput);
    });

    test("96 zero bits", () => {
        expect(getShortenIPv6Address(ninetySixZeroBits)).toEqual(ninetySixZeroOutput);
    });

    test("80 zero bits", () => {
        expect(getShortenIPv6Address(noZeroBitOctet)).toEqual(noZeroBitOutput);
    });

    test("middle 32 zero bits", () => {
        expect(getShortenIPv6Address(middleThirtyTwoZero)).toEqual(middleThirtyOutput);
    });

    test("end 16 zero bits", () => {
        expect(getShortenIPv6Address(endSixTeenZeroBits)).toEqual(endSixTeenZeroOutput);
    });

    test("no zero bit octet", () => {
        expect(getShortenIPv6Address(eightyZeroBits)).toEqual(eightyZeroOutput);
    });
});
