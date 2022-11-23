import { ipv6TypeKey } from "../../data/ipv6ResultTable";
import { IPv6Address } from "../../model/IPv6Address";
import { ipv6Calculator } from "../../util/ipv6Calculator";

describe("displayIPAddress test", () => {
    const unspecifiedData: IPv6Address = {
        ipAddress: "::",
        subnet: "128",
        isShort: true,
    };

    const longToShortAddressData: IPv6Address = {
        ipAddress: "2001:0db8:beef:0123:3212:0000:0000:0001",
        subnet: "64",
        isShort: true,
    };

    const shortToLongAddressData: IPv6Address = {
        ipAddress: "2001:db8:beef:123:3212::1",
        subnet: "64",
        isShort: false,
    };

    const onlyOneZeroAddressData: IPv6Address = {
        ipAddress: "2001:0db8:beef:0123:3212:0000:567:0001",
        subnet: "64",
        isShort: true,
    };

    test("unspecified", () => {
        expect(ipv6Calculator(ipv6TypeKey.ipAddress, unspecifiedData)).toBe("::/128");
    });

    test("long to short", () => {
        expect(ipv6Calculator(ipv6TypeKey.ipAddress, longToShortAddressData)).toBe(
            "2001:db8:beef:123:3212::1/64",
        );
    });

    test("short to long", () => {
        expect(ipv6Calculator(ipv6TypeKey.ipAddress, shortToLongAddressData)).toBe(
            "2001:0db8:beef:0123:3212:0000:0000:0001/64",
        );
    });

    test("one zero bit", () => {
        expect(ipv6Calculator(ipv6TypeKey.ipAddress, onlyOneZeroAddressData)).toBe(
            "2001:db8:beef:123:3212:0:567:1/64",
        );
    });
});
