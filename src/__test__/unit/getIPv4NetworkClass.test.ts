import { ipv4TypeKey } from "../../data/ipv4ResultTable";
import { ipv4Calculator } from "../../util/ipv4Calculator";

describe("getIPv4NetworkClass test", () => {
    test("Class A start", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkClass, "0.0.0.1", "24")).toBe("A");
    });

    test("Class A end", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkClass, "127.255.255.255", "24")).toBe("A");
    });

    test("Class B start", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkClass, "128.0.0.0", "24")).toBe("B");
    });

    test("Class B end", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkClass, "191.255.255.255", "24")).toBe("B");
    });

    test("Class C start", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkClass, "192.0.0.0", "24")).toBe("C");
    });

    test("Class C end", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkClass, "223.255.255.255", "24")).toBe("C");
    });

    test("Class D start", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkClass, "224.0.0.0", "24")).toBe("D(Multicast)");
    });

    test("Class D end", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkClass, "239.255.255.255", "24")).toBe(
            "D(Multicast)",
        );
    });

    test("Class E", () => {
        expect(ipv4Calculator(ipv4TypeKey.networkClass, "240.0.0.0", "24")).toBe("E");
    });
});
