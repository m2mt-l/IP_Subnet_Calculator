import { ipv4TypeKey } from "../../data/ipv4ResultTable";
import { IPv4Address } from "../../model/IPv4Address";
import { ipv4Calculator } from "../../util/ipv4Calculator";

describe("getIPv4SubnetMask test", () => {
    const subnetZeroData: IPv4Address = {
        ipAddress: "192.168.0.1",
        subnet: "0",
    };

    const subnetEightData: IPv4Address = {
        ipAddress: "192.168.0.1",
        subnet: "8",
    };

    const subnetSixteenData: IPv4Address = {
        ipAddress: "192.168.0.1",
        subnet: "16",
    };

    const subnetTwentyFourData: IPv4Address = {
        ipAddress: "192.168.0.1",
        subnet: "24",
    };

    const subnetThirtyData: IPv4Address = {
        ipAddress: "192.168.0.1",
        subnet: "30",
    };

    const subnetThirtyOneData: IPv4Address = {
        ipAddress: "192.168.0.1",
        subnet: "31",
    };

    const subnetThirtyTwoData: IPv4Address = {
        ipAddress: "192.168.0.1",
        subnet: "32",
    };

    test("ipv4 /0 subnet mask", () => {
        expect(ipv4Calculator(ipv4TypeKey.subnetMask, subnetZeroData)).toBe("0.0.0.0");
    });

    test("ipv4 /8 subnet mask", () => {
        expect(ipv4Calculator(ipv4TypeKey.subnetMask, subnetEightData)).toBe("255.0.0.0");
    });

    test("ipv4 /16 subnet mask", () => {
        expect(ipv4Calculator(ipv4TypeKey.subnetMask, subnetSixteenData)).toBe("255.255.0.0");
    });

    test("ipv4 /24 subnet mask", () => {
        expect(ipv4Calculator(ipv4TypeKey.subnetMask, subnetTwentyFourData)).toBe("255.255.255.0");
    });

    test("ipv4 /30 subnet mask", () => {
        expect(ipv4Calculator(ipv4TypeKey.subnetMask, subnetThirtyData)).toBe("255.255.255.252");
    });

    test("ipv4 /31 subnet mask", () => {
        expect(ipv4Calculator(ipv4TypeKey.subnetMask, subnetThirtyOneData)).toBe("255.255.255.254");
    });

    test("ipv4 /32 subnet mask", () => {
        expect(ipv4Calculator(ipv4TypeKey.subnetMask, subnetThirtyTwoData)).toBe("255.255.255.255");
    });
});
