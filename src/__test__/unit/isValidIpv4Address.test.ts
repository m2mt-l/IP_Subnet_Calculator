import { isValidIpv4Address } from "../../util/ipv4AddressValidation";

describe("ipv4 address validation test", () => {
    test("no input", () => {
        expect(isValidIpv4Address("")).toBeFalsy;
    });

    test("short ipv4 address", () => {
        expect(isValidIpv4Address("192.168.9")).toBeFalsy;
    });

    test("long ipv4 address", () => {
        expect(isValidIpv4Address("192.168.9.1.1")).toBeFalsy;
    });

    test("include hex address", () => {
        expect(isValidIpv4Address("192.168.1.f")).toBeFalsy;
    });

    test("include negative number address", () => {
        expect(isValidIpv4Address("192.168.1.-1")).toBeFalsy;
    });

    test("include over 8 bit address", () => {
        expect(isValidIpv4Address("192.168.1.256")).toBeFalsy;
    });

    test("correct address should be true", () => {
        expect(isValidIpv4Address("192.168.1.1")).toBeTruthy;
    });
});
