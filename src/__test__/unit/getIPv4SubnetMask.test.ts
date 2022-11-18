import { ipv4TypeKey } from "../../data/ipv4ResultTable";
import { ipv4Calculator } from "../../util/ipv4Calculator";

describe("getIPv4SubnetMask test", () => {
    test("ipv4 /0 subnet mask", () => {
        expect(ipv4Calculator(ipv4TypeKey.subnetMask, "192.168.0.1", "0")).toBe("0.0.0.0");
    });

    test("ipv4 /8 subnet mask", () => {
        expect(ipv4Calculator(ipv4TypeKey.subnetMask, "192.168.0.1", "8")).toBe("255.0.0.0");
    });

    test("ipv4 /16 subnet mask", () => {
        expect(ipv4Calculator(ipv4TypeKey.subnetMask, "192.168.0.1", "16")).toBe("255.255.0.0");
    });

    test("ipv4 /24 subnet mask", () => {
        expect(ipv4Calculator(ipv4TypeKey.subnetMask, "192.168.0.1", "24")).toBe("255.255.255.0");
    });

    test("ipv4 /30 subnet mask", () => {
        expect(ipv4Calculator(ipv4TypeKey.subnetMask, "192.168.0.1", "30")).toBe("255.255.255.252");
    });

    test("ipv4 /31 subnet mask", () => {
        expect(ipv4Calculator(ipv4TypeKey.subnetMask, "192.168.0.1", "31")).toBe("255.255.255.254");
    });

    test("ipv4 /32 subnet mask", () => {
        expect(ipv4Calculator(ipv4TypeKey.subnetMask, "192.168.0.1", "32")).toBe("255.255.255.255");
    });
});
