import { ipv4TypeKey } from "../../data/ipv4ResultTable";
import { ipv4Calculator } from "../../util/ipv4Calculator";

describe("getIPv4MappedAddress test", () => {
    test("Class A", () => {
        expect(ipv4Calculator(ipv4TypeKey.ipv4Mapped, "10.5.2.7", "24")).toBe("::ffff:0a05.0207");
    });

    test("Class B", () => {
        expect(ipv4Calculator(ipv4TypeKey.ipv4Mapped, "172.16.3.67", "24")).toBe(
            "::ffff:ac10.0343",
        );
    });

    test("Class C", () => {
        expect(ipv4Calculator(ipv4TypeKey.ipv4Mapped, "192.168.0.1", "24")).toBe(
            "::ffff:c0a8.0001",
        );
    });
});
