import { getShortestSubnet } from "../../../util/ipv6SummaryCalculator";
import { IPv6Address } from "../../../model/IPv6Address";
import { ShortestSubnetData } from "../../../model/ShortestSubnetData";

describe("getShortestSubnet", () => {
    const threeSubnetsData: IPv6Address[] = [
        { ipAddress: "2001:db8:1231::", subnet: "48" },
        { ipAddress: "2001:db8:1232::", subnet: "47" },
        { ipAddress: "2001:db8:1233::", subnet: "46" },
    ];

    const threeSubnetOutput: ShortestSubnetData = {
        subnet: 46,
        index: 2,
    };

    const includeZeroSubnetsData: IPv6Address[] = [
        { ipAddress: "2001:db8:1231::", subnet: "48" },
        { ipAddress: "2001:db8:1232::", subnet: "47" },
        { ipAddress: "2001:db8:1233::", subnet: "0" },
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
