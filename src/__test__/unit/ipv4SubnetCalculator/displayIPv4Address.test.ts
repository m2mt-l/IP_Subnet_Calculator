import { ipv4TypeKey } from "../../../data/ipv4ResultTable";
import { IPv4Address } from "../../../model/IPv4Address";
import { ipv4SubnetCalculator } from "../../../util/ipv4SubnetCalculator";

describe("displayIPAddress test", () => {
    const displayClassCData: IPv4Address = {
        ipAddress: "192.168.0.1",
        subnet: "24",
    };

    test("ipv4 address", () => {
        expect(ipv4SubnetCalculator(ipv4TypeKey.ipAddress, displayClassCData)).toBe(
            "192.168.0.1/24",
        );
    });
});
