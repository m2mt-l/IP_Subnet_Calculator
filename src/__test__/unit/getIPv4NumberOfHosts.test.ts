import { ipv4TypeKey } from "../../data/ipv4ResultTable";
import { ipv4Calculator } from "../../util/ipv4Calculator";

describe("getIPv4NumberOfHosts test", () => {
    test("ipv4 /0 number of hosts", () => {
        expect(ipv4Calculator(ipv4TypeKey.numberOfHosts, "192.168.0.1", "0")).toBe("4,294,967,294");
    });

    test("ipv4 /8 number of hosts", () => {
        expect(ipv4Calculator(ipv4TypeKey.numberOfHosts, "192.168.0.1", "8")).toBe("16,777,214");
    });

    test("ipv4 /16 number of hosts", () => {
        expect(ipv4Calculator(ipv4TypeKey.numberOfHosts, "192.168.0.1", "16")).toBe("65,534");
    });

    test("ipv4 /24 number of hosts", () => {
        expect(ipv4Calculator(ipv4TypeKey.numberOfHosts, "192.168.0.1", "24")).toBe("254");
    });

    test("ipv4 /30 number of hosts", () => {
        expect(ipv4Calculator(ipv4TypeKey.numberOfHosts, "192.168.0.1", "30")).toBe("2");
    });

    test("ipv4 /31 number of hosts", () => {
        expect(ipv4Calculator(ipv4TypeKey.numberOfHosts, "192.168.0.1", "31")).toBe("0");
    });

    test("ipv4 /32 number of hosts", () => {
        expect(ipv4Calculator(ipv4TypeKey.numberOfHosts, "192.168.0.1", "32")).toBe("0");
    });
});
