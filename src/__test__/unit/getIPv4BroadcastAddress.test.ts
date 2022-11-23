import { ipv4TypeKey } from "../../data/ipv4ResultTable";
import { IPv4Address } from "../../model/IPv4Address";
import { ipv4Calculator } from "../../util/ipv4Calculator";

describe("getIPv4BroadcastAddress test", () => {
    const subnetZeroData: IPv4Address = {
        ipAddress: "192.168.0.1",
        subnet: "0",
    };

    const subnetEightData: IPv4Address = {
        ipAddress: "192.168.0.1",
        subnet: "8",
    };

    const subnetSixteenData: IPv4Address = {
        ipAddress: "192.168.10.1",
        subnet: "16",
    };

    const subnetTwentyFourData: IPv4Address = {
        ipAddress: "192.168.0.2",
        subnet: "24",
    };

    const subnetTwentyFiveData: IPv4Address = {
        ipAddress: "192.168.0.1",
        subnet: "25",
    };

    const subnetThirtyTwoData: IPv4Address = {
        ipAddress: "192.168.0.1",
        subnet: "32",
    };

    test("ipv4 /0 broadcast address", () => {
        expect(ipv4Calculator(ipv4TypeKey.broadcastAddress, subnetZeroData)).toBe(
            "255.255.255.255",
        );
    });

    test("ipv4 /8 broadcast address", () => {
        expect(ipv4Calculator(ipv4TypeKey.broadcastAddress, subnetEightData)).toBe(
            "192.255.255.255",
        );
    });

    test("ipv4 /16 broadcast address", () => {
        expect(ipv4Calculator(ipv4TypeKey.broadcastAddress, subnetSixteenData)).toBe(
            "192.168.255.255",
        );
    });

    test("ipv4 /24 broadcast address", () => {
        expect(ipv4Calculator(ipv4TypeKey.broadcastAddress, subnetTwentyFourData)).toBe(
            "192.168.0.255",
        );
    });

    test("ipv4 /25 broadcast address", () => {
        expect(ipv4Calculator(ipv4TypeKey.broadcastAddress, subnetTwentyFiveData)).toBe(
            "192.168.0.127",
        );
    });

    test("ipv4 /32 broadcast address", () => {
        expect(ipv4Calculator(ipv4TypeKey.broadcastAddress, subnetThirtyTwoData)).toBe(
            "192.168.0.1",
        );
    });
});
