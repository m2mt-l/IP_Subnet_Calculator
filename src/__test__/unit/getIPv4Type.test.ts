import { ipv4TypeKey } from "../../data/ipv4ResultTable";
import { ipv4Calculator } from "../../util/ipv4Calculator";

describe("getIPv4Type test", () => {
    test("Class A private", () => {
        expect(ipv4Calculator(ipv4TypeKey.ipType, "10.1.1.1", "24")).toBe("Private");
    });

    test("Class A public", () => {
        expect(ipv4Calculator(ipv4TypeKey.ipType, "1.1.1.1", "24")).toBe("Global");
    });

    test("Class B private", () => {
        expect(ipv4Calculator(ipv4TypeKey.ipType, "172.16.1.1", "24")).toBe("Private");
    });

    test("Class B public", () => {
        expect(ipv4Calculator(ipv4TypeKey.ipType, "172.32.1.1", "24")).toBe("Global");
    });

    test("Class C private", () => {
        expect(ipv4Calculator(ipv4TypeKey.ipType, "192.168.1.1", "24")).toBe("Private");
    });

    test("Class C public", () => {
        expect(ipv4Calculator(ipv4TypeKey.ipType, "192.169.1.1", "24")).toBe("Global");
    });
});
