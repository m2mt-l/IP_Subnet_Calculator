import { ipv4TypeKey } from "../../data/ipv4ResultTable";
import { IPv4Address } from "../../model/IPv4Address";
import { ipv4Calculator } from "../../util/ipv4Calculator";

describe("getIPv4MappedAddress test", () => {
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
        expect(ipv4Calculator(ipv4TypeKey.ipv4Mapped, classAData)).toBe("::ffff:0a05.0207");
    });

    test("Class B", () => {
        expect(ipv4Calculator(ipv4TypeKey.ipv4Mapped, classBData)).toBe("::ffff:ac10.0343");
    });

    test("Class C", () => {
        expect(ipv4Calculator(ipv4TypeKey.ipv4Mapped, classCData)).toBe("::ffff:c0a8.0001");
    });
});
