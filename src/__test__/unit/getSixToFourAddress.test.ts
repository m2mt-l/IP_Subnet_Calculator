import { ipv4TypeKey } from "../../data/ipv4ResultTable";
import { ipv4Calculator } from "../../util/ipv4Calculator";

describe("getSixToFourAddress test", () => {
    test("Class A", () => {
        expect(ipv4Calculator(ipv4TypeKey.sixToFour, "10.5.2.7", "24")).toBe("2002:0a05.0207::/48");
    });

    test("Class B", () => {
        expect(ipv4Calculator(ipv4TypeKey.sixToFour, "172.16.3.67", "24")).toBe(
            "2002:ac10.0343::/48",
        );
    });

    test("Class C", () => {
        expect(ipv4Calculator(ipv4TypeKey.sixToFour, "192.168.0.1", "24")).toBe(
            "2002:c0a8.0001::/48",
        );
    });
});
