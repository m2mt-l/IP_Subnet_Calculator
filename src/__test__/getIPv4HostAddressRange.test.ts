import { ipv4TypeKey } from "../data/ipv4ResultTable";
import { ipv4Calculator } from "../util/ipv4Calculator";

describe("getIPv4HostAddressRange test", () => {
    test("ipv4 /0 host address range", () => {
        expect(ipv4Calculator(ipv4TypeKey.hostAddressRange, "192.168.0.12", "0")).toBe(
            "0.0.0.1 - 255.255.255.254",
        );
    });

    test("ipv4 /8 host address range", () => {
        expect(ipv4Calculator(ipv4TypeKey.hostAddressRange, "192.168.0.12", "8")).toBe(
            "192.0.0.1 - 192.255.255.254",
        );
    });

    test("ipv4 /16 host address range", () => {
        expect(ipv4Calculator(ipv4TypeKey.hostAddressRange, "192.168.0.12", "16")).toBe(
            "192.168.0.1 - 192.168.255.254",
        );
    });

    test("ipv4 /24 host address range", () => {
        expect(ipv4Calculator(ipv4TypeKey.hostAddressRange, "192.168.0.12", "24")).toBe(
            "192.168.0.1 - 192.168.0.254",
        );
    });

    test("ipv4 /25 host address range", () => {
        expect(ipv4Calculator(ipv4TypeKey.hostAddressRange, "192.168.0.12", "25")).toBe(
            "192.168.0.1 - 192.168.0.126",
        );
    });

    test("ipv4 /26 host address range", () => {
        expect(ipv4Calculator(ipv4TypeKey.hostAddressRange, "192.168.0.12", "26")).toBe(
            "192.168.0.1 - 192.168.0.62",
        );
    });

    test("ipv4 /30 host address range", () => {
        expect(ipv4Calculator(ipv4TypeKey.hostAddressRange, "192.168.0.1", "30")).toBe(
            "192.168.0.1 - 192.168.0.2",
        );
    });

    test("ipv4 /31 host address range", () => {
        expect(ipv4Calculator(ipv4TypeKey.hostAddressRange, "192.168.0.1", "31")).toBe("N/A");
    });

    test("ipv4 /32 host address range", () => {
        expect(ipv4Calculator(ipv4TypeKey.hostAddressRange, "192.168.0.1", "32")).toBe("N/A");
    });
});
