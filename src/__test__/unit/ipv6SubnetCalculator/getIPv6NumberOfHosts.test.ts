import { ipv6TypeKey } from "../../../data/ipv6ResultTable";
import { IPv6Address } from "../../../model/IPv6Address";
import { ipv6SubnetCalculator } from "../../../util/ipv6SubnetCalculator";

describe("getNumberOfHosts test", () => {
    const subnetZeroTestData: IPv6Address = {
        ipAddress: "::",
        subnet: "0",
        isShort: true,
    };

    const subnetSixFourTestData: IPv6Address = {
        ipAddress: "::",
        subnet: "64",
        isShort: true,
    };

    const subnetOneTwentyEightTestData: IPv6Address = {
        ipAddress: "::",
        subnet: "128",
        isShort: true,
    };

    test("/0", () => {
        expect(ipv6SubnetCalculator(ipv6TypeKey.numberOfHosts, subnetZeroTestData)).toBe(
            "340,282,366,920,938,463,463,374,607,431,768,211,456",
        );
    });
    test("/64", () => {
        expect(ipv6SubnetCalculator(ipv6TypeKey.numberOfHosts, subnetSixFourTestData)).toBe(
            "18,446,744,073,709,551,616",
        );
    });
    test("/128", () => {
        expect(ipv6SubnetCalculator(ipv6TypeKey.numberOfHosts, subnetOneTwentyEightTestData)).toBe(
            "1",
        );
    });
});
