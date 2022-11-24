import { ipv4TypeKey } from "../../data/ipv4ResultTable";
import { IPv4Address } from "../../model/IPv4Address";
import { ipv4SubnetCalculator } from "../../util/ipv4SubnetCalculator";

describe("getIPv4NumberOfHosts test", () => {
    const subnetZeroData: IPv4Address = {
        ipAddress: "192.168.0.1",
        subnet: "0",
    };

    const subnetEightData: IPv4Address = {
        ipAddress: "192.168.0.12",
        subnet: "8",
    };

    const subnetSixteenData: IPv4Address = {
        ipAddress: "192.168.0.12",
        subnet: "16",
    };

    const subnetTwentyFourData: IPv4Address = {
        ipAddress: "192.168.0.12",
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

    test("ipv4 /0 number of hosts", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.numberOfHosts, subnetZeroData)).toBe(
            "4,294,967,294",
        );
    });

    test("ipv4 /8 number of hosts", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.numberOfHosts, subnetEightData)).toBe("16,777,214");
    });

    test("ipv4 /16 number of hosts", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.numberOfHosts, subnetSixteenData)).toBe("65,534");
    });

    test("ipv4 /24 number of hosts", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.numberOfHosts, subnetTwentyFourData)).toBe("254");
    });

    test("ipv4 /30 number of hosts", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.numberOfHosts, subnetThirtyData)).toBe("2");
    });

    test("ipv4 /31 number of hosts", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.numberOfHosts, subnetThirtyOneData)).toBe("0");
    });

    test("ipv4 /32 number of hosts", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.numberOfHosts, subnetThirtyTwoData)).toBe("0");
    });
});
