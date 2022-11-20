import { ipv4TypeKey } from "../../data/ipv4ResultTable";
import { ipv4Calculator } from "../../util/ipv4Calculator";
import { IPv4Address } from "../../model/IPv4Address";

describe("getIPv4NetworkAddress test", () => {
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
        ipAddress: "192.168.0.129",
        subnet: "25",
    };

    const subnetThirtyTwoData: IPv4Address = {
        ipAddress: "192.168.0.1",
        subnet: "32",
    };

    test("ipv4 /0 network address", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkAddress, subnetZeroData)).toBe("0.0.0.0");
    });

    test("ipv4 /8 network address", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkAddress, subnetEightData)).toBe("192.0.0.0");
    });

    test("ipv4 /16 network address", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkAddress, subnetSixteenData)).toBe("192.168.0.0");
    });

    test("ipv4 /24 network address", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkAddress, subnetTwentyFourData)).toBe(
            "192.168.0.0",
        );
    });

    test("ipv4 /25 network address", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkAddress, subnetTwentyFiveData)).toBe(
            "192.168.0.128",
        );
    });

    test("ipv4 /32 network address", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkAddress, subnetThirtyTwoData)).toBe("192.168.0.1");
    });
});
