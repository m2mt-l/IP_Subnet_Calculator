import { getShortestSubnet } from "../../../util/ipv4SummaryCalculator";
import { IPv4Address } from "../../../model/IPv4Address";
import { ShortestSubnetData } from "../../../model/ShortestSubnetData";

describe("getShortestSubnet", () => {
    const threeSubnetsData: IPv4Address[] = [
        { ipAddress: "10.0.0.1", subnet: "24" },
        { ipAddress: "10.0.1.1", subnet: "23" },
        { ipAddress: "10.0.0.1", subnet: "22" },
    ];

    const threeSubnetOutput: ShortestSubnetData = {
        subnet: 22,
        index: 2,
    };

    const includeZeroSubnetsData: IPv4Address[] = [
        { ipAddress: "10.0.0.1", subnet: "24" },
        { ipAddress: "10.0.1.1", subnet: "23" },
        { ipAddress: "10.0.0.1", subnet: "0" },
    ];

    const zeroSubnetOutput: ShortestSubnetData = {
        subnet: 0,
        index: 2,
    };

    test("get shortest subnet from 3", () => {
        expect(getShortestSubnet(threeSubnetsData)).toEqual(threeSubnetOutput);
    });

    test("get shortest subnet from zero subnets data", () => {
        expect(getShortestSubnet(includeZeroSubnetsData)).toEqual(zeroSubnetOutput);
    });
});
