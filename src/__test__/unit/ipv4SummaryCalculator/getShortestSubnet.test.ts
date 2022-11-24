import { getShortestSubnet } from "../../../util/ipv4SummaryCalculator";
import { IPv4Address } from "../../../model/IPv4Address";

describe("getShortestSubnet", () => {
    const threeSubnetsData: IPv4Address[] = [
        { ipAddress: "10.0.0.1", subnet: "24" },
        { ipAddress: "10.0.1.1", subnet: "23" },
        { ipAddress: "10.0.0.1", subnet: "22" },
    ];

    const includeZeroSubnetsData: IPv4Address[] = [
        { ipAddress: "10.0.0.1", subnet: "24" },
        { ipAddress: "10.0.1.1", subnet: "23" },
        { ipAddress: "10.0.0.1", subnet: "0" },
    ];

    test("get shortest subnet from 3", () => {
        expect(getShortestSubnet(threeSubnetsData)).toBe(22);
    });

    test("get shortest subnet from zero subnets data", () => {
        expect(getShortestSubnet(includeZeroSubnetsData)).toBe(0);
    });
});
