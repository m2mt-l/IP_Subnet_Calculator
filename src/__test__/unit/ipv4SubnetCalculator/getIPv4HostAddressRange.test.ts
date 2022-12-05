import { ipv4TypeKey } from "../../../data/ipv4ResultTable";
import { IPv4Address } from "../../../model/IPv4Address";
import { ipv4SubnetCalculator } from "../../../util/ipv4SubnetCalculator";

describe("getIPv4HostAddressRange test", () => {
    const subnetZeroData: IPv4Address = {
        ipAddress: "192.168.0.12",
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

    const subnetTwentyFiveData: IPv4Address = {
        ipAddress: "192.168.0.12",
        subnet: "25",
    };

    const subnetTwentySixData: IPv4Address = {
        ipAddress: "192.168.0.12",
        subnet: "26",
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

    test("ipv4 /0 host address range", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.hostAddressRange, subnetZeroData)).toBe(
            "0.0.0.1 - 255.255.255.254",
        );
    });

    test("ipv4 /8 host address range", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.hostAddressRange, subnetEightData)).toBe(
            "192.0.0.1 - 192.255.255.254",
        );
    });

    test("ipv4 /16 host address range", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.hostAddressRange, subnetSixteenData)).toBe(
            "192.168.0.1 - 192.168.255.254",
        );
    });

    test("ipv4 /24 host address range", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.hostAddressRange, subnetTwentyFourData)).toBe(
            "192.168.0.1 - 192.168.0.254",
        );
    });

    test("ipv4 /25 host address range", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.hostAddressRange, subnetTwentyFiveData)).toBe(
            "192.168.0.1 - 192.168.0.126",
        );
    });

    test("ipv4 /26 host address range", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.hostAddressRange, subnetTwentySixData)).toBe(
            "192.168.0.1 - 192.168.0.62",
        );
    });

    test("ipv4 /30 host address range", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.hostAddressRange, subnetThirtyData)).toBe(
            "192.168.0.1 - 192.168.0.2",
        );
    });

    test("ipv4 /31 host address range", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.hostAddressRange, subnetThirtyOneData)).toBe("N/A");
    });

    test("ipv4 /32 host address range", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.hostAddressRange, subnetThirtyTwoData)).toBe("N/A");
    });
});
