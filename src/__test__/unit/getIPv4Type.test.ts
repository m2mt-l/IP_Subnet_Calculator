import { ipv4TypeKey } from "../../data/ipv4ResultTable";
import { IPv4Address } from "../../model/IPv4Address";
import { ipv4SubnetCalculator } from "../../util/ipv4SubnetCalculator";

describe("getIPv4Type test", () => {
    const classAPrivateData: IPv4Address = {
        ipAddress: "10.1.1.1",
        subnet: "24",
    };

    const classAGlobalData: IPv4Address = {
        ipAddress: "1.1.1.1",
        subnet: "24",
    };

    const classBPrivateData: IPv4Address = {
        ipAddress: "172.16.1.1",
        subnet: "24",
    };

    const classBGlobalData: IPv4Address = {
        ipAddress: "172.32.1.1",
        subnet: "24",
    };

    const classCPrivateData: IPv4Address = {
        ipAddress: "192.168.1.1",
        subnet: "24",
    };

    const classCGlobalData: IPv4Address = {
        ipAddress: "192.169.1.1",
        subnet: "24",
    };

    const classDStartData: IPv4Address = {
        ipAddress: "224.0.0.0",
        subnet: "24",
    };

    const classDEndData: IPv4Address = {
        ipAddress: "239.255.255.255",
        subnet: "24",
    };

    const classEData: IPv4Address = {
        ipAddress: "240.0.0.0",
        subnet: "24",
    };

    test("Class A private", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.ipType, classAPrivateData)).toBe("Private");
    });

    test("Class A global", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.ipType, classAGlobalData)).toBe("Global");
    });

    test("Class B private", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.ipType, classBPrivateData)).toBe("Private");
    });

    test("Class B global", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.ipType, classBGlobalData)).toBe("Global");
    });

    test("Class C private", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.ipType, classCPrivateData)).toBe("Private");
    });

    test("Class C global", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.ipType, classCGlobalData)).toBe("Global");
    });
});
