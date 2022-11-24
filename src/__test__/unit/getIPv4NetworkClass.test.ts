import { ipv4TypeKey } from "../../data/ipv4ResultTable";
import { IPv4Address } from "../../model/IPv4Address";
import { ipv4SubnetCalculator } from "../../util/ipv4SubnetCalculator";

describe("getIPv4NetworkClass test", () => {
    const classAStartData: IPv4Address = {
        ipAddress: "0.0.0.1",
        subnet: "24",
    };

    const classAEndData: IPv4Address = {
        ipAddress: "127.255.255.255",
        subnet: "24",
    };

    const classBStartData: IPv4Address = {
        ipAddress: "128.0.0.0",
        subnet: "24",
    };

    const classBEndData: IPv4Address = {
        ipAddress: "191.255.255.255",
        subnet: "24",
    };

    const classCStartData: IPv4Address = {
        ipAddress: "192.0.0.0",
        subnet: "24",
    };

    const classCEndData: IPv4Address = {
        ipAddress: "223.255.255.255",
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

    test("Class A start", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.networkClass, classAStartData)).toBe("A");
    });

    test("Class A end", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.networkClass, classAEndData)).toBe("A");
    });

    test("Class B start", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.networkClass, classBStartData)).toBe("B");
    });

    test("Class B end", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.networkClass, classBEndData)).toBe("B");
    });

    test("Class C start", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.networkClass, classCStartData)).toBe("C");
    });

    test("Class C end", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.networkClass, classCEndData)).toBe("C");
    });

    test("Class D start", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.networkClass, classDStartData)).toBe(
            "D(Multicast)",
        );
    });

    test("Class D end", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.networkClass, classDEndData)).toBe("D(Multicast)");
    });

    test("Class E", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.networkClass, classEData)).toBe("E");
    });
});
