import { ipv4TypeKey } from "../../data/ipv4ResultTable";
import { ipv4Calculator } from "../../util/ipv4Calculator";
import { IPv4Address } from "../../model/IPv4Address";

describe("displayIPAddress test", () => {
    const displayClassCData: IPv4Address = {
        ipAddress: "192.168.0.1",
        subnet: "24",
    };

    test("ipv4 address", () => {
        expect(ipv4Calculator(ipv4TypeKey.ipAddress, displayClassCData)).toBe("192.168.0.1/24");
    });
});
