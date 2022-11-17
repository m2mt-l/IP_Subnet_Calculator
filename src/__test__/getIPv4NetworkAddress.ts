import { ipv4TypeKey } from "../data/ipv4ResultTable";
import { ipv4Calculator } from "../util/ipv4Calculator";

describe("getIPv4NetworkAddress test", () => {
    test("ipv4 /0 network address", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkAddress, "192.168.0.1", "0")).toBe("0.0.0.0");
    });

    test("ipv4 /8 network address", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkAddress, "192.168.0.1", "8")).toBe("192.0.0.0");
    });

    test("ipv4 /16 network address", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkAddress, "192.168.10.1", "16")).toBe(
            "192.168.0.0",
        );
    });

    test("ipv4 /24 network address", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkAddress, "192.168.0.2", "24")).toBe("192.168.0.0");
    });

    test("ipv4 /25 network address", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkAddress, "192.168.0.129", "25")).toBe(
            "192.168.0.128",
        );
    });

    test("ipv4 /32 network address", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkAddress, "192.168.0.1", "32")).toBe("192.168.0.1");
    });
});
