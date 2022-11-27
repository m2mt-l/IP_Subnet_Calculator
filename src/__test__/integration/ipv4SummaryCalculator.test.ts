import { ipv4SummaryCalculator } from "../../util/ipv4SummaryCalculator";
import { IPv4Address } from "../../model/IPv4Address";

describe("ipv4SummaryCalculator", () => {
    const standardSubnetTwentyFour: IPv4Address[] = [
        { ipAddress: "10.2.0.1", subnet: "24" },
        { ipAddress: "10.2.1.1", subnet: "24" },
        { ipAddress: "10.2.2.1", subnet: "24" },
        { ipAddress: "10.2.3.1", subnet: "24" },
    ];

    const outputDefaultRoute: IPv4Address[] = [
        { ipAddress: "10.2.0.1", subnet: "24" },
        { ipAddress: "10.2.1.1", subnet: "24" },
        { ipAddress: "10.2.2.1", subnet: "24" },
        { ipAddress: "10.2.3.1", subnet: "0" },
    ];

    const sameAddressDifferentSubnet: IPv4Address[] = [
        { ipAddress: "10.2.0.1", subnet: "24" },
        { ipAddress: "10.2.0.1", subnet: "23" },
        { ipAddress: "10.2.0.1", subnet: "22" },
        { ipAddress: "10.2.0.1", subnet: "8" },
    ];

    const checkSecondOctetWith24Subnet: IPv4Address[] = [
        { ipAddress: "10.0.0.1", subnet: "24" },
        { ipAddress: "10.1.0.1", subnet: "24" },
        { ipAddress: "10.2.0.1", subnet: "24" },
        { ipAddress: "10.3.0.1", subnet: "24" },
    ];

    const checkShorterSubnetThanCalculatedOctet: IPv4Address[] = [
        { ipAddress: "10.2.0.1", subnet: "14" },
        { ipAddress: "10.2.2.1", subnet: "24" },
        { ipAddress: "10.2.1.1", subnet: "23" },
        { ipAddress: "10.2.3.1", subnet: "22" },
    ];

    const randomOctetShortBit: IPv4Address[] = [
        { ipAddress: "10.2.0.1", subnet: "21" },
        { ipAddress: "10.17.2.1", subnet: "24" },
        { ipAddress: "10.42.1.1", subnet: "23" },
        { ipAddress: "10.127.3.1", subnet: "22" },
    ];

    const randomOctetDefaultRoute: IPv4Address[] = [
        { ipAddress: "10.2.0.1", subnet: "23" },
        { ipAddress: "100.17.2.1", subnet: "8" },
        { ipAddress: "192.42.1.1", subnet: "24" },
        { ipAddress: "172.127.3.1", subnet: "16" },
    ];

    const sameSubnetSameNumberZeroBits: IPv4Address[] = [
        { ipAddress: "10.2.5.1", subnet: "24" },
        { ipAddress: "10.2.4.1", subnet: "24" },
    ];

    const sameSubnetDifferentNumberZeroBits: IPv4Address[] = [
        { ipAddress: "10.2.4.1", subnet: "24" },
        { ipAddress: "10.2.3.1", subnet: "24" },
    ];

    test("summarize 24 bit", () => {
        expect(ipv4SummaryCalculator(standardSubnetTwentyFour)).toBe("10.2.0.0/22");
    });

    test("output default route", () => {
        expect(ipv4SummaryCalculator(outputDefaultRoute)).toBe("0.0.0.0/0");
    });

    test("shortest subnet", () => {
        expect(ipv4SummaryCalculator(sameAddressDifferentSubnet)).toBe("10.0.0.0/8");
    });

    test("check second octet", () => {
        expect(ipv4SummaryCalculator(checkSecondOctetWith24Subnet)).toBe("10.0.0.0/14");
    });

    test("check shorter subnet than calculated octet", () => {
        expect(ipv4SummaryCalculator(checkShorterSubnetThanCalculatedOctet)).toBe("10.0.0.0/14");
    });

    test("random octet short bit", () => {
        expect(ipv4SummaryCalculator(randomOctetShortBit)).toBe("10.0.0.0/9");
    });

    test("random octet default route", () => {
        expect(ipv4SummaryCalculator(randomOctetDefaultRoute)).toBe("0.0.0.0/0");
    });

    test("same subnet same number zero bits", () => {
        expect(ipv4SummaryCalculator(sameSubnetSameNumberZeroBits)).toBe("10.2.4.0/23");
    });

    test("same subnet different number zero bits", () => {
        expect(ipv4SummaryCalculator(sameSubnetDifferentNumberZeroBits)).toBe("10.2.0.0/21");
    });
});
