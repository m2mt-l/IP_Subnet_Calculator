import { IPv4Address } from "../model/IPv4Address";
import { ipv4SubnetHashMap } from "../data/ipv4Subnet";

export function ipv4SummaryCalculator(ipv4SummaryArray: IPv4Address[]): string {
    const shortestSubnet: string = getShortestSubnet(ipv4SummaryArray);
    // subnet zero should be a default route
    if (shortestSubnet === "0") return "0.0.0.0/0";
    return "";
}

export function getShortestSubnet(ipv4SummaryArray: IPv4Address[]): string {
    const subnetArray: number[] = ipv4SummaryArray.map((ipv4) => parseInt(ipv4.subnet, 10));
    return subnetArray
        .reduce((prevValue, currentValue) => Math.min(prevValue, currentValue))
        .toString();
}

// refactor: move common util
function splitIPv4Address(ipv4Address: string): number[] {
    return ipv4Address.split(".").map((octet) => parseInt(octet, 10));
}

// refactor: move common util
function splitSubnetMask(subnet: string): number[] {
    return ipv4SubnetHashMap[subnet].split(".").map((octet) => parseInt(octet, 10));
}
