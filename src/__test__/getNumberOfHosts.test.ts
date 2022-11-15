import { ipv6TypeKey } from "../data/ipv6ResultTable";
import { ipv6Calculator } from "../util/ipv6Calculator";

describe("getNumberOfHosts test", () => {
    test("/0", () => {
        expect(ipv6Calculator(ipv6TypeKey.numberOfHosts, "::", "0")).toBe(
            "340,282,366,920,938,463,463,374,607,431,768,211,456",
        );
    });
    test("/64", () => {
        expect(ipv6Calculator(ipv6TypeKey.numberOfHosts, "::", "64")).toBe(
            "18,446,744,073,709,551,616",
        );
    });
    test("/128", () => {
        expect(ipv6Calculator(ipv6TypeKey.numberOfHosts, "::", "128")).toBe("1");
    });
});
