import { getShortenIPv6Address } from "../../util/ipv6CalculatorUtil";

describe("getShortenIPv6Address RFC5952", () => {
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

    const twoZeroVsThreeZero: string[] = [
        "2001",
        "0000",
        "0000",
        "beef",
        "0000",
        "0000",
        "0000",
        "0001",
    ];
    const twoZeroVsThreeZeroOutput: string[] = ["2001", "0", "0", "beef", "", "1"];

    const sameZeroFieldLength: string[] = [
        "2001",
        "0db8",
        "0000",
        "0000",
        "0001",
        "0000",
        "0000",
        "0001",
    ];
    const sameZeroFieldLengthOutput: string[] = ["2001", "db8", "", "1", "0", "0", "1"];

    test("default route", () => {
        expect(getShortenIPv6Address(defaultRoute)).toEqual(defaultRouteOutput);
    });

    test("96 zero bits", () => {
        expect(getShortenIPv6Address(ninetySixZeroBits)).toEqual(ninetySixZeroOutput);
    });

    test("80 zero bits", () => {
        expect(getShortenIPv6Address(eightyZeroBits)).toEqual(eightyZeroOutput);
    });

    test("middle 32 zero bits", () => {
        expect(getShortenIPv6Address(middleThirtyTwoZero)).toEqual(middleThirtyOutput);
    });

    test("end 16 zero bits", () => {
        expect(getShortenIPv6Address(endSixTeenZeroBits)).toEqual(endSixTeenZeroOutput);
    });

    test("no zero bit octet", () => {
        expect(getShortenIPv6Address(noZeroBitOctet)).toEqual(noZeroBitOutput);
    });

    test("two zero vs three zero", () => {
        expect(getShortenIPv6Address(twoZeroVsThreeZero)).toEqual(twoZeroVsThreeZeroOutput);
    });

    test("same zero fields length", () => {
        expect(getShortenIPv6Address(sameZeroFieldLength)).toEqual(sameZeroFieldLengthOutput);
    });
});
