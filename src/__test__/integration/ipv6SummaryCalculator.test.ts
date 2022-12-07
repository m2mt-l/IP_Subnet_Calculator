import { ipv6SummaryCalculator } from "../../util/ipv6SummaryCalculator";
import { IPv6Address } from "../../model/IPv6Address";
import { ResultIPv6Summary } from "../../model/ResultIPv6Summary";

describe("ipv6SummaryCalculator", () => {
    /* test case template
    const test: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "::", subnet: "64" },
            { ipAddress: "::", subnet: "64" },
            { ipAddress: "::", subnet: "64" },
            { ipAddress: "::", subnet: "64" },
        ],
        isShort: true,
    };

    const output: string = "::/64";
    */

    // 32 + 12 + 2
    const shortStandardSubnetFortyEight: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "2001:db8:a0::", subnet: "48" },
            { ipAddress: "2001:db8:a1::", subnet: "48" },
            { ipAddress: "2001:db8:a2::", subnet: "48" },
            { ipAddress: "2001:db8:a3::", subnet: "48" },
        ],
        isShort: true,
    };

    const shortStandardSubnetFortyEightOutput: string = "2001:db8:a0::/46";

    const longStandardSubnetFortyEight: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "2001:db8:a0::", subnet: "48" },
            { ipAddress: "2001:db8:a1::", subnet: "48" },
            { ipAddress: "2001:db8:a2::", subnet: "48" },
            { ipAddress: "2001:db8:a3::", subnet: "48" },
        ],
        isShort: false,
    };

    const longStandardSubnetFortyEightOutput: string = "2001:0db8:00a0:0000:0000:0000:0000:0000/46";

    const shortDefaultRoute: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "2001:db8:a0::", subnet: "48" },
            { ipAddress: "2001:db8:a1::", subnet: "48" },
            { ipAddress: "2001:db8:a2::", subnet: "48" },
            { ipAddress: "2001:db8:a3::", subnet: "0" },
        ],
        isShort: true,
    };

    const shortDefaultRouteOutput: string = "::/0";

    const longDefaultRoute: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "2001:db8:a0::", subnet: "48" },
            { ipAddress: "2001:db8:a1::", subnet: "48" },
            { ipAddress: "2001:db8:a2::", subnet: "48" },
            { ipAddress: "2001:db8:a3::", subnet: "0" },
        ],
        isShort: false,
    };

    const longDefaultRouteOutput: string = "0000:0000:0000:0000:0000:0000:0000:0000/0";

    const shortSameAddressDifferentSubnet: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "2001:db8:a0::", subnet: "48" },
            { ipAddress: "2001:db8:a0::", subnet: "48" },
            { ipAddress: "2001:db8:a0::", subnet: "48" },
            { ipAddress: "2001:db8:a0::", subnet: "44" },
        ],
        isShort: true,
    };

    const shortSameAddressDifferentSubnetOutput: string = "2001:db8:a0::/44";

    const longSameAddressDifferentSubnet: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "2001:db8:a0::", subnet: "48" },
            { ipAddress: "2001:db8:a0::", subnet: "48" },
            { ipAddress: "2001:db8:a0::", subnet: "48" },
            { ipAddress: "2001:db8:a0::", subnet: "44" },
        ],
        isShort: false,
    };

    const longSameAddressDifferentSubnetOutput: string =
        "2001:0db8:00a0:0000:0000:0000:0000:0000/44";

    const shortSecondOctetWith48Subnet: ResultIPv6Summary = {
        ipv6SummaryArray: [
            // 16 + 12 + 2
            { ipAddress: "2001:db8:a0::", subnet: "48" },
            { ipAddress: "2001:db9:a1::", subnet: "48" },
            { ipAddress: "2001:dba:a2::", subnet: "48" },
            { ipAddress: "2001:dbb:a3::", subnet: "48" },
        ],
        isShort: true,
    };

    const shortSecondOctetWith48SubnetOutput: string = "2001:db8::/30";

    const longSecondOctetWith48Subnet: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "2001:db8:a0::", subnet: "48" },
            { ipAddress: "2001:db9:a1::", subnet: "48" },
            { ipAddress: "2001:dba:a2::", subnet: "48" },
            { ipAddress: "2001:dbb:a3::", subnet: "48" },
        ],
        isShort: false,
    };

    const longSecondOctetWith48SubnetOutput: string = "2001:0db8:0000:0000:0000:0000:0000:0000/30";

    const shortShorterSubnetThanCalculatedOctet: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "2001:db8:a0::", subnet: "48" },
            { ipAddress: "2001:db8:a1::", subnet: "48" },
            { ipAddress: "2001:db8:a2::", subnet: "48" },
            { ipAddress: "2001:db8:a3::", subnet: "32" },
        ],
        isShort: true,
    };

    const shortShorterSubnetThanCalculatedOctetOutput: string = "2001:db8::/32";

    const longShorterSubnetThanCalculatedOctet: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "2001:db8:a0::", subnet: "48" },
            { ipAddress: "2001:db8:a1::", subnet: "48" },
            { ipAddress: "2001:db8:a2::", subnet: "48" },
            { ipAddress: "2001:db8:a3::", subnet: "32" },
        ],
        isShort: false,
    };

    const longShorterSubnetThanCalculatedOctetOutput: string =
        "2001:0db8:0000:0000:0000:0000:0000:0000/32";

    const shortRandomOctetDefaultRoute: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "0001:db8:a0::", subnet: "23" },
            { ipAddress: "2001:db8:a1::", subnet: "8" },
            { ipAddress: "a001:db8:a1::", subnet: "24" },
            { ipAddress: "f001:db8:a1::", subnet: "16" },
        ],
        isShort: true,
    };

    const shortRandomOctetDefaultRouteOutput: string = "::/0";

    const longRandomOctetDefaultRoute: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "0001:db8:a0::", subnet: "23" },
            { ipAddress: "2001:db8:a1::", subnet: "8" },
            { ipAddress: "a001:db8:a1::", subnet: "24" },
            { ipAddress: "f001:db8:a1::", subnet: "16" },
        ],
        isShort: false,
    };

    const longRandomOctetDefaultRouteOutput: string = "0000:0000:0000:0000:0000:0000:0000:0000/0";

    const shortSameSubnetSameNumberZeroBits: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "2001:db8:a0::", subnet: "48" },
            { ipAddress: "2001:db8:a4::", subnet: "48" },
        ],
        isShort: true,
    };

    const shortSameSubnetSameNumberZeroBitsOutput: string = "2001:db8:a0::/45";

    const longSameSubnetSameNumberZeroBits: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "2001:db8:a0::", subnet: "48" },
            { ipAddress: "2001:db8:a4::", subnet: "48" },
        ],
        isShort: false,
    };

    const longSameSubnetSameNumberZeroBitsOutput: string =
        "2001:0db8:00a0:0000:0000:0000:0000:0000/45";

    const shortSameSubnetDifferentNumberZeroBits: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "2001:db8:a4::", subnet: "48" },
            { ipAddress: "2001:db8:a5::", subnet: "48" },
        ],
        isShort: true,
    };

    const shortSameSubnetDifferentNumberZeroBitsOutput: string = "2001:db8:a4::/47";

    const longSameSubnetDifferentNumberZeroBits: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "2001:db8:a4::", subnet: "48" },
            { ipAddress: "2001:db8:a5::", subnet: "48" },
        ],
        isShort: false,
    };

    const longSameSubnetDifferentNumberZeroBitsOutput: string =
        "2001:0db8:00a4:0000:0000:0000:0000:0000/47";

    const shortSecondOctetCheck: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "2001:db8:a4::", subnet: "48" },
            { ipAddress: "2001:beef:a5::", subnet: "48" },
        ],
        isShort: true,
    };

    const shortSecondOctetCheckOutput: string = "2001::/16";

    const longSecondOctetCheck: ResultIPv6Summary = {
        ipv6SummaryArray: [
            { ipAddress: "2001:db8:a4::", subnet: "48" },
            { ipAddress: "2001:beef:a5::", subnet: "48" },
        ],
        isShort: false,
    };

    const longSecondOctetCheckOutput: string = "2001:0000:0000:0000:0000:0000:0000:0000/16";

    test("summarize 48 bit short", () => {
        expect(ipv6SummaryCalculator(shortStandardSubnetFortyEight)).toBe(
            shortStandardSubnetFortyEightOutput,
        );
    });

    test("summarize 48 bit long", () => {
        expect(ipv6SummaryCalculator(longStandardSubnetFortyEight)).toBe(
            longStandardSubnetFortyEightOutput,
        );
    });

    test("output short default route", () => {
        expect(ipv6SummaryCalculator(shortDefaultRoute)).toBe(shortDefaultRouteOutput);
    });

    test("output long default route", () => {
        expect(ipv6SummaryCalculator(longDefaultRoute)).toBe(longDefaultRouteOutput);
    });

    test("short same address and different subnet", () => {
        expect(ipv6SummaryCalculator(shortSameAddressDifferentSubnet)).toBe(
            shortSameAddressDifferentSubnetOutput,
        );
    });
    test("long same address and different subnet", () => {
        expect(ipv6SummaryCalculator(longSameAddressDifferentSubnet)).toBe(
            longSameAddressDifferentSubnetOutput,
        );
    });
    test("check second octet short", () => {
        expect(ipv6SummaryCalculator(shortSecondOctetWith48Subnet)).toBe(
            shortSecondOctetWith48SubnetOutput,
        );
    });
    test("check second octet long", () => {
        expect(ipv6SummaryCalculator(longSecondOctetWith48Subnet)).toBe(
            longSecondOctetWith48SubnetOutput,
        );
    });
    test("check shorter subnet than calculated octet short", () => {
        expect(ipv6SummaryCalculator(shortShorterSubnetThanCalculatedOctet)).toBe(
            shortShorterSubnetThanCalculatedOctetOutput,
        );
    });
    test("check shorter subnet than calculated octet long", () => {
        expect(ipv6SummaryCalculator(longShorterSubnetThanCalculatedOctet)).toBe(
            longShorterSubnetThanCalculatedOctetOutput,
        );
    });
    test("random octet default route short", () => {
        expect(ipv6SummaryCalculator(shortRandomOctetDefaultRoute)).toBe(
            shortRandomOctetDefaultRouteOutput,
        );
    });
    test("random octet default route long", () => {
        expect(ipv6SummaryCalculator(longRandomOctetDefaultRoute)).toBe(
            longRandomOctetDefaultRouteOutput,
        );
    });

    test("same subnet same number zero bits short", () => {
        expect(ipv6SummaryCalculator(shortSameSubnetSameNumberZeroBits)).toBe(
            shortSameSubnetSameNumberZeroBitsOutput,
        );
    });

    test("same subnet same number zero bits long", () => {
        expect(ipv6SummaryCalculator(longSameSubnetSameNumberZeroBits)).toBe(
            longSameSubnetSameNumberZeroBitsOutput,
        );
    });
    test("same subnet different number zero bits short", () => {
        expect(ipv6SummaryCalculator(shortSameSubnetDifferentNumberZeroBits)).toBe(
            shortSameSubnetDifferentNumberZeroBitsOutput,
        );
    });
    test("same subnet different number zero bits long", () => {
        expect(ipv6SummaryCalculator(longSameSubnetDifferentNumberZeroBits)).toBe(
            longSameSubnetDifferentNumberZeroBitsOutput,
        );
    });
    test("second octet check short", () => {
        expect(ipv6SummaryCalculator(shortSecondOctetCheck)).toBe(shortSecondOctetCheckOutput);
    });

    test("second octet check long", () => {
        expect(ipv6SummaryCalculator(longSecondOctetCheck)).toBe(longSecondOctetCheckOutput);
    });
});
