import { IPv4Address } from "../model/IPv4Address";
import { ipv4SubnetHashMap } from "../data/ipv4Subnet";

export function ipv4SummaryCalculator(ipv4SummaryArray: IPv4Address[]): string {
    const shortestSubnet: string = getShortestSubnet(ipv4SummaryArray);
    // subnet zero should be a default route
    if (shortestSubnet === "0") return "0.0.0.0/0";
    const ipv4NetworkAddressArray: number[][] = ipv4SummaryArray.map((ipv4) =>
        getIPv4NetworkAddress(ipv4),
    );

    const calculatedOctetIndex: number = getCalculatedOctetIndex(shortestSubnet);
    return "";
}

export function getShortestSubnet(ipv4SummaryArray: IPv4Address[]): string {
    const subnetArray: number[] = ipv4SummaryArray.map((ipv4) => parseInt(ipv4.subnet, 10));
    return subnetArray
        .reduce((prevValue, currentValue) => Math.min(prevValue, currentValue))
        .toString();
}

export function getCalculatedOctetIndex(subnet: string): number {
    const subnetNumber: number = parseInt(subnet, 10);
    // less than 8 bits should be a first octet
    if (subnetNumber <= 8) return 0;
    // less than 16 bits should be a second octet
    else if (subnetNumber <= 16) return 1;
    // less than 24 bits should be a third octet
    else if (subnetNumber <= 24) return 2;
    // more than 25 bits should be a fourth octet
    else return 3;
}

export function getIPv4NetworkAddress(ipv4: IPv4Address): number[] {
    const ipv4AddressArray: number[] = splitIPv4Address(ipv4.ipAddress);
    const subnetArray: number[] = splitSubnetMask(ipv4.subnet);

    const networkAddress = [0, 0, 0, 0].map((octet, index) =>
        operateAND(ipv4AddressArray[index], subnetArray[index]),
    );
    return networkAddress;
}

// refactor: move common util
function splitIPv4Address(ipv4Address: string): number[] {
    return ipv4Address.split(".").map((octet) => parseInt(octet, 10));
}

// refactor: move common util
function splitSubnetMask(subnet: string): number[] {
    return ipv4SubnetHashMap[subnet].split(".").map((octet) => parseInt(octet, 10));
}

// refactor: move common util
function operateAND(n1: number, n2: number): number {
    return (n1 &= n2);
}

// refactor: move common util
function operateOR(n1: number, n2: number): number {
    return (n1 |= n2);
}
