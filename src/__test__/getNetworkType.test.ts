import { ipv6TypeKey } from "../data/ipv6ResultTable";
import { ipv6Calculator } from "../util/ipv6Calculator";

describe("getNetworkType test", () => {
    test("multicast", () => {
        expect(ipv6Calculator(ipv6TypeKey.networkType, "ff00::1", "64")).toBe("Multicast");
    });
    test("link-local", () => {
        expect(ipv6Calculator(ipv6TypeKey.networkType, "fe80::1", "64")).toBe("Link-Local Unicast");
    });
    test("unspecified", () => {
        expect(ipv6Calculator(ipv6TypeKey.networkType, "::", "128")).toBe("Unspecified");
    });
    test("loopback", () => {
        expect(ipv6Calculator(ipv6TypeKey.networkType, "::1", "128")).toBe("Loopback");
    });
    test("global", () => {
        expect(ipv6Calculator(ipv6TypeKey.networkType, "2001:beef::1", "64")).toBe(
            "Global Unicast",
        );
    });
});
