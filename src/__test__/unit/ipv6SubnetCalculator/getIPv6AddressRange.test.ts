import { ipv6TypeKey } from "../../../data/ipv6ResultTable";
import { IPv6Address } from "../../../model/IPv6Address";
import { ipv6SubnetCalculator } from "../../../util/ipv6SubnetCalculator";

describe("displayIPAddress test", () => {
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

    test("long to short", () => {
        expect(ipv6SubnetCalculator(ipv6TypeKey.ipAddressRange, longToShortAddressData)).toBe(
            "2001:db8:beef:123:: - 2001:db8:beef:123:ffff:ffff:ffff:ffff",
        );
    });

    test("short to long", () => {
        expect(ipv6SubnetCalculator(ipv6TypeKey.ipAddressRange, shortToLongAddressData)).toBe(
            "2001:0db8:beef:0123:0000:0000:0000:0000 - 2001:0db8:beef:0123:ffff:ffff:ffff:ffff",
        );
    });
});
