import { ipv4TypeKey } from "../../data/ipv4ResultTable";
import { ipv4Calculator } from "../../util/ipv4Calculator";

describe("getIPv4BroadcastAddress test", () => {
    test("ipv4 /0 broadcast address", () => {
        expect(ipv4Calculator(ipv4TypeKey.broadcastAddress, "192.168.0.1", "0")).toBe(
            "255.255.255.255",
        );
    });

    test("ipv4 /8 broadcast address", () => {
        expect(ipv4Calculator(ipv4TypeKey.broadcastAddress, "192.168.0.1", "8")).toBe(
            "192.255.255.255",
        );
    });

    test("ipv4 /16 broadcast address", () => {
        expect(ipv4Calculator(ipv4TypeKey.broadcastAddress, "192.168.10.1", "16")).toBe(
            "192.168.255.255",
        );
    });

    test("ipv4 /24 broadcast address", () => {
        expect(ipv4Calculator(ipv4TypeKey.broadcastAddress, "192.168.0.2", "24")).toBe(
            "192.168.0.255",
        );
    });

    test("ipv4 /25 broadcast address", () => {
        expect(ipv4Calculator(ipv4TypeKey.broadcastAddress, "192.168.0.1", "25")).toBe(
            "192.168.0.127",
        );
    });

    test("ipv4 /32 broadcast address", () => {
        expect(ipv4Calculator(ipv4TypeKey.broadcastAddress, "192.168.0.1", "32")).toBe(
            "192.168.0.1",
        );
    });
});
