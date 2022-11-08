import { ipv6TypeKey } from "../data/ipv6ResultTable";

export function ipv6Calculator(type: string, ipv6Address: string, subnet: string): string {
    const ipv6CalculatorHashmap: { [key: string]: string } = {
        [ipv6TypeKey.ipAddress]: "ip address",
        [ipv6TypeKey.network]: "network",
        [ipv6TypeKey.ipAddressRange]: "ip address range",
        [ipv6TypeKey.numberOfHosts]: "number of hosts",
    };
    return ipv6CalculatorHashmap[type];
}
