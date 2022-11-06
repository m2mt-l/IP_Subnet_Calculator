import { Output } from "@mui/icons-material";
import { ipv4ResultTable } from "../data/ipv4ResultTable";
import { ipv4SubnetHashMap } from "../data/ipv4Subnet";
/*
export const ipv4ResultTable: string[] = [
    "IP address",
    "Network Address",
    "Host Address Range",
    "Number of available hosts",
    "Broadcast Address",
    "Subnet Mask",
    "IPv4 Mapped",
    "6to4 Prefix",
];
*/

export interface IPv4ResultValue {
    [key: string]: string;
}

export function ipv4ResultValueHashmap(): IPv4ResultValue {
    const output: IPv4ResultValue = {};
    ipv4ResultTable.forEach((type) => {
        output[type] = "";
    });
    return output;
}

export function ipv4Calculator(
    type: string,
    ipv4Address: string,
    subnet: string,
): { [key: string]: string } {
    const ipv4CalculatorHashmap: { [key: string]: string } = {
        "IP address": displayIPAddress(ipv4Address, subnet),
        "Network Address": getNetworkAddress(ipv4Address, subnet),
        "Host Address Range": "",
        "Number of available hosts": "",
        "Broadcast Address": "",
        "Subnet Mask": "",
        "IPv4 Mapped": "",
        "6to4 Prefix": "",
    };
    return ipv4CalculatorHashmap;
}

// Show IP address and CIDR
function displayIPAddress(ipv4Address: string, subnet: string): string {
    return ipv4Address + "/" + subnet;
}

function getNetworkAddress(ipv4Address: string, subnet: string): string {
    const networkAddress: string[] = ["", "", "", ""];

    // [192, 168, 0, 1]
    const splitIPv4Address: number[] = ipv4Address.split(".").map((octet) => parseInt(octet, 10));

    // [255, 255, 255, 0]
    const splitSubnetMask: number[] = ipv4SubnetHashMap[subnet]
        .split(".")
        .map((octet) => parseInt(octet, 10));

    networkAddress.map((octet, index) => {
        octet = operateAND(splitIPv4Address[index], splitSubnetMask[index]);
        return octet;
    });

    return networkAddress.join(".");
}

// bitwise AND operation
function operateAND(n1: number, n2: number): string {
    return (n1 &= n2).toString();
}
