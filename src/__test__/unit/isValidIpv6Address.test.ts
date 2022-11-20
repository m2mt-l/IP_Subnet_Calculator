import { isValidIpv6Address } from "../../util/ipv6AddressValidation";

describe("ipv6 address validation test", () => {
    test("no input", () => {
        expect(isValidIpv6Address("")).toBeFalsy;
    });

    test("short bit", () => {
        expect(isValidIpv6Address("2001:1:1")).toBeFalsy;
    });

    test("long bit", () => {
        expect(isValidIpv6Address("2001:1:2:3:4:5:6:7:8")).toBeFalsy;
    });

    test("include not hex", () => {
        expect(isValidIpv6Address("2001:1:2:3:4:5:6:e")).toBeFalsy;
    });

    test("include negative address", () => {
        expect(isValidIpv6Address("2001:1:2:3:4:5:6:-7")).toBeFalsy;
    });

    test("one octet over 16 bit", () => {
        expect(isValidIpv6Address("20011:1:2:3:4:5:6:7")).toBeFalsy;
    });

    test("correct long address", () => {
        expect(isValidIpv6Address("2001:1:2:3:4:5:6:7")).toBeTruthy;
    });

    test("correct short address", () => {
        expect(isValidIpv6Address("2001::3:4:5:6:7")).toBeTruthy;
    });

    test("ipv4 address", () => {
        expect(isValidIpv6Address("192.168.0.1")).toBeFalsy;
    });
});
