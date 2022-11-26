import { ipv4SubnetHashMap } from "../data/ipv4Subnet";

export function splitIPv4Address(ipv4Address: string): number[] {
    return ipv4Address.split(".").map((octet) => parseInt(octet, 10));
}

export function splitSubnetMask(subnet: string): number[] {
    return ipv4SubnetHashMap[subnet].split(".").map((octet) => parseInt(octet, 10));
}

export function operateAND(n1: number, n2: number): number {
    return (n1 &= n2);
}
