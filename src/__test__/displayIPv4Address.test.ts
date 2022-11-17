import { ipv4TypeKey } from "../data/ipv4ResultTable";
import { ipv4Calculator } from "../util/ipv4Calculator";

describe("displayIPAddress test", () => {
    test("ipv4 address", () => {
        expect(ipv4Calculator(ipv4TypeKey.ipAddress, "192.168.0.1", "24")).toBe("192.168.0.1/24");
    });
});
