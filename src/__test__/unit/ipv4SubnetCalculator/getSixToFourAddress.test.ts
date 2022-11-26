import { ipv4TypeKey } from "../../../data/ipv4ResultTable";
import { IPv4Address } from "../../../model/IPv4Address";
import { ipv4SubnetCalculator } from "../../../util/ipv4SubnetCalculator";

describe("getSixToFourAddress test", () => {
    const classAData: IPv4Address = {
        ipAddress: "10.5.2.7",
        subnet: "24",
    };

    const classBData: IPv4Address = {
        ipAddress: "172.16.3.67",
        subnet: "24",
    };

    const classCData: IPv4Address = {
        ipAddress: "192.168.0.1",
        subnet: "24",
    };

    test("Class A", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.sixToFour, classAData)).toBe("2002:0a05.0207::/48");
    });

    test("Class B", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.sixToFour, classBData)).toBe("2002:ac10.0343::/48");
    });

    test("Class C", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.sixToFour, classCData)).toBe("2002:c0a8.0001::/48");
    });
});
