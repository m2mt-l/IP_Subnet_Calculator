import { getFullIPv6Address } from "../../util/ipv6CalculatorUtil";

describe("getFullIPv6Address", () => {
    const defaultRoute: string = "::";
    const defaultRouteOutput: string[] = [
        "0000",
        "0000",
        "0000",
        "0000",
        "0000",
        "0000",
        "0000",
        "0000",
    ];

    // 96
    const ninetySixZeroBits: string = "2001:db8::";
    const ninetySixZeroOutput: string[] = [
        "2001",
        "0db8",
        "0000",
        "0000",
        "0000",
        "0000",
        "0000",
        "0000",
    ];

    // 80
    const eightyZeroBits: string = "2001:db8:beef::";
    const eightyZeroOutput: string[] = [
        "2001",
        "0db8",
        "beef",
        "0000",
        "0000",
        "0000",
        "0000",
        "0000",
    ];

    // middle 32
    const middleThirtyTwoZero: string = "2001:db8:beef::9abc:de:f";
    const middleThirtyOutput: string[] = [
        "2001",
        "0db8",
        "beef",
        "0000",
        "0000",
        "9abc",
        "00de",
        "000f",
    ];

    // end 16
    const endSixTeenZeroBits: string = "2001:db8:beef:1234:5678:9abc:de:0";
    const endSixTeenZeroOutput: string[] = [
        "2001",
        "0db8",
        "beef",
        "1234",
        "5678",
        "9abc",
        "00de",
        "0000",
    ];

    // no zero bit octet
    const noZeroBitOctet: string = "2001:db8:beef:1234:5678:9abc:de:f";
    const noZeroBitOutput: string[] = [
        "2001",
        "0db8",
        "beef",
        "1234",
        "5678",
        "9abc",
        "00de",
        "000f",
    ];

    test("default route", () => {
        expect(getFullIPv6Address(defaultRoute)).toEqual(defaultRouteOutput);
    });

    test("96 zero bits", () => {
        expect(getFullIPv6Address(ninetySixZeroBits)).toEqual(ninetySixZeroOutput);
    });

    test("80 zero bits", () => {
        expect(getFullIPv6Address(noZeroBitOctet)).toEqual(noZeroBitOutput);
    });

    test("middle 32 zero bits", () => {
        expect(getFullIPv6Address(middleThirtyTwoZero)).toEqual(middleThirtyOutput);
    });

    test("end 16 zero bits", () => {
        expect(getFullIPv6Address(endSixTeenZeroBits)).toEqual(endSixTeenZeroOutput);
    });

    test("no zero bit octet", () => {
        expect(getFullIPv6Address(eightyZeroBits)).toEqual(eightyZeroOutput);
    });
});
