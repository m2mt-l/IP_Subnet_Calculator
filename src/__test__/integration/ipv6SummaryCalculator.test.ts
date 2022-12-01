import { ipv6SummaryCalculator } from "../../util/ipv6SummaryCalculator";
import { IPv6Address } from "../../model/IPv6Address";

describe("ipv6SummaryCalculator", () => {
    // 32 + 12 + 2
    const standardSubnetFortyEight: IPv6Address[] = [
        { ipAddress: "2001:db8:a0::", subnet: "48" },
        { ipAddress: "2001:db8:a1::", subnet: "48" },
        { ipAddress: "2001:db8:a2::", subnet: "48" },
        { ipAddress: "2001:db8:a3::", subnet: "48" },
    ];

    const outputDefaultRoute: IPv6Address[] = [
        { ipAddress: "2001:db8:a0::", subnet: "48" },
        { ipAddress: "2001:db8:a1::", subnet: "48" },
        { ipAddress: "2001:db8:a2::", subnet: "48" },
        { ipAddress: "2001:db8:a3::", subnet: "0" },
    ];

    const sameAddressDifferentSubnet: IPv6Address[] = [
        { ipAddress: "2001:db8:a0::", subnet: "48" },
        { ipAddress: "2001:db8:a0::", subnet: "48" },
        { ipAddress: "2001:db8:a0::", subnet: "48" },
        { ipAddress: "2001:db8:a0::", subnet: "44" },
    ];

    const checkSecondOctetWith48Subnet: IPv6Address[] = [
        // 16 + 12 + 2
        { ipAddress: "2001:db8:a0::", subnet: "48" },
        { ipAddress: "2001:db9:a1::", subnet: "48" },
        { ipAddress: "2001:dba:a2::", subnet: "48" },
        { ipAddress: "2001:dbb:a3::", subnet: "48" },
    ];

    const checkShorterSubnetThanCalculatedOctet: IPv6Address[] = [
        { ipAddress: "2001:db8:a0::", subnet: "48" },
        { ipAddress: "2001:db8:a1::", subnet: "48" },
        { ipAddress: "2001:db8:a2::", subnet: "48" },
        { ipAddress: "2001:db8:a3::", subnet: "32" },
    ];

    const randomOctetDefaultRoute: IPv6Address[] = [
        { ipAddress: "0001:db8:a0::", subnet: "23" },
        { ipAddress: "2001:db8:a1::", subnet: "8" },
        { ipAddress: "a001:db8:a1::", subnet: "24" },
        { ipAddress: "f001:db8:a1::", subnet: "16" },
    ];

    const sameSubnetSameNumberZeroBits: IPv6Address[] = [
        { ipAddress: "2001:db8:a0::", subnet: "48" },
        { ipAddress: "2001:db8:a4::", subnet: "48" },
    ];

    const sameSubnetDifferentNumberZeroBits: IPv6Address[] = [
        { ipAddress: "2001:db8:a4::", subnet: "48" },
        { ipAddress: "2001:db8:a5::", subnet: "48" },
    ];

    test("summarize 48 bit", () => {
        expect(ipv6SummaryCalculator(standardSubnetFortyEight)).toBe(
            "2001:0db8:00a0:0000:0000:0000:0000:0000/46",
        );
    });

    test("output default route", () => {
        expect(ipv6SummaryCalculator(outputDefaultRoute)).toBe("::/0");
    });

    test("shortest subnet", () => {
        expect(ipv6SummaryCalculator(sameAddressDifferentSubnet)).toBe(
            "2001:0db8:00a0:0000:0000:0000:0000:0000/44",
        );
    });

    test("check second octet", () => {
        expect(ipv6SummaryCalculator(checkSecondOctetWith48Subnet)).toBe(
            "2001:0db8:0000:0000:0000:0000:0000:0000/30",
        );
    });

    test("check shorter subnet than calculated octet", () => {
        expect(ipv6SummaryCalculator(checkShorterSubnetThanCalculatedOctet)).toBe(
            "2001:0db8:0000:0000:0000:0000:0000:0000/32",
        );
    });

    test("random octet default route", () => {
        expect(ipv6SummaryCalculator(randomOctetDefaultRoute)).toBe(
            "0000:0000:0000:0000:0000:0000:0000:0000/0",
        );
    });

    test("same subnet same number zero bits", () => {
        expect(ipv6SummaryCalculator(sameSubnetSameNumberZeroBits)).toBe(
            "2001:0db8:00a0:0000:0000:0000:0000:0000/45",
        );
    });

    test("same subnet different number zero bits", () => {
        expect(ipv6SummaryCalculator(sameSubnetDifferentNumberZeroBits)).toBe(
            "2001:0db8:00a4:0000:0000:0000:0000:0000/47",
        );
    });
});
