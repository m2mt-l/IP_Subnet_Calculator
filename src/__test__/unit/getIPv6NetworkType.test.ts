import { ipv6TypeKey } from "../../data/ipv6ResultTable";
import { IPv6Address } from "../../model/IPv6Address";
import { ipv6Calculator } from "../../util/ipv6Calculator";

describe("getNetworkType test", () => {
    const multicastTestData: IPv6Address = {
        ipAddress: "ff00::1",
        subnet: "64",
        isShort: true,
    };

    const linkLocalTestData: IPv6Address = {
        ipAddress: "fe80::1",
        subnet: "64",
        isShort: true,
    };

    const unspecifiedTestData: IPv6Address = {
        ipAddress: "::",
        subnet: "128",
        isShort: true,
    };

    const loopbackTestData: IPv6Address = {
        ipAddress: "::1",
        subnet: "128",
        isShort: true,
    };

    const globalTestData: IPv6Address = {
        ipAddress: "2001:beef::1",
        subnet: "64",
        isShort: true,
    };

    test("multicast", () => {
        expect(ipv6Calculator(ipv6TypeKey.networkType, multicastTestData)).toBe("Multicast");
    });
    test("link-local", () => {
        expect(ipv6Calculator(ipv6TypeKey.networkType, linkLocalTestData)).toBe(
            "Link-Local Unicast",
        );
    });
    test("unspecified", () => {
        expect(ipv6Calculator(ipv6TypeKey.networkType, unspecifiedTestData)).toBe("Unspecified");
    });
    test("loopback", () => {
        expect(ipv6Calculator(ipv6TypeKey.networkType, loopbackTestData)).toBe("Loopback");
    });
    test("global", () => {
        expect(ipv6Calculator(ipv6TypeKey.networkType, globalTestData)).toBe("Global Unicast");
    });
});
