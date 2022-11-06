import { ipv4SubnetHashMap } from "../data/ipv4Subnet";

export function ipv4Calculator(type: string, ipv4Address: string, subnet: string): string {
    const ipv4CalculatorHashmap: { [key: string]: string } = {
        "IP address": displayIPAddress(ipv4Address, subnet),
        "Network Address": getNetworkAddress(ipv4Address, subnet),
        "Host Address Range": "",
        "Number of available hosts": "",
        "Broadcast Address": getBroadcastAddress(ipv4Address, subnet),
        "Subnet Mask": getSubnetMask(subnet),
        "IPv4 Mapped": "",
        "6to4 Prefix": "",
    };
    return ipv4CalculatorHashmap[type];
}

// Show IP address and CIDR
function displayIPAddress(ipv4Address: string, subnet: string): string {
    return ipv4Address + "/" + subnet;
}

function getNetworkAddress(ipv4Address: string, subnet: string): string {
    let networkAddress: string[] = ["", "", "", ""];

    const ipv4AddressArray: number[] = splitIPv4Address(ipv4Address);
    const subnetArray: number[] = splitSubnetMask(subnet);

    networkAddress = networkAddress.map((octet, index) =>
        operateAND(ipv4AddressArray[index], subnetArray[index]),
    );

    return networkAddress.join(".");
}

function getBroadcastAddress(ipv4Address: string, subnet: string): string {
    let broadcastAddress: string[] = ["", "", "", ""];

    const ipv4AddressArray: number[] = splitIPv4Address(ipv4Address);
    const wildcardArray: number[] = getWildcardMaskArray(splitSubnetMask(subnet));

    broadcastAddress = broadcastAddress.map((octet, index) =>
        operateOR(ipv4AddressArray[index], wildcardArray[index]),
    );

    return broadcastAddress.join(".");
}

// [192, 168, 0, 1]
function splitIPv4Address(ipv4Address: string): number[] {
    return ipv4Address.split(".").map((octet) => parseInt(octet, 10));
}

// [255, 255, 255, 0]
function splitSubnetMask(subnet: string): number[] {
    return getSubnetMask(subnet)
        .split(".")
        .map((octet) => parseInt(octet, 10));
}

// bitwise AND operation
function operateAND(n1: number, n2: number): string {
    return (n1 &= n2).toString();
}

// bitwise OR operation
function operateOR(n1: number, n2: number): string {
    return (n1 |= n2).toString();
}

function getWildcardMaskArray(subnetArray: number[]): number[] {
    return subnetArray.map((subnet) => 255 - subnet);
}

function getSubnetMask(subnet: string): string {
    return ipv4SubnetHashMap[subnet];
}
