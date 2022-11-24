import { IPv4Address } from "../model/IPv4Address";
import { ipv4SubnetHashMap } from "../data/ipv4Subnet";

export function ipv4SummaryCalculator(ipv4SummaryArray: IPv4Address[]): string {
    const shortestSubnet: number = getShortestSubnet(ipv4SummaryArray);
    // subnet zero should be a default route
    if (shortestSubnet === 0) return "0.0.0.0/0";

    const ipv4NetworkAddressArray: number[][] = ipv4SummaryArray.map((ipv4) =>
        getIPv4NetworkAddress(ipv4),
    );

    const calculatedOctetIndex: number = getCalculatedOctetIndex(ipv4NetworkAddressArray);

    return "";
}

export function getShortestSubnet(ipv4SummaryArray: IPv4Address[]): number {
    const subnetArray: number[] = ipv4SummaryArray.map((ipv4) => parseInt(ipv4.subnet, 10));
    return subnetArray.reduce((prevValue, currentValue) => Math.min(prevValue, currentValue));
}

/*
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
*/

export function getIPv4NetworkAddress(ipv4: IPv4Address): number[] {
    const ipv4AddressArray: number[] = splitIPv4Address(ipv4.ipAddress);
    const subnetArray: number[] = splitSubnetMask(ipv4.subnet);

    const networkAddress = [0, 0, 0, 0].map((octet, index) =>
        operateAND(ipv4AddressArray[index], subnetArray[index]),
    );
    return networkAddress;
}

/*
    [10,2,0,0],[10,2,1,0],[10,2,2,0],[10,2,3,0]
    [0][0] -> [1][0] -> [2][0] -> [3][0] -> [0][1] -> [1][1]...
    */
export function getCalculatedOctetIndex(ipv4NetworkAddressArray: number[][]): number {
    const ipv4AddressOctetLength: number = 4;
    for (let i = 0; i < ipv4AddressOctetLength; i++) {
        for (let j = 1; j < ipv4NetworkAddressArray.length; j++) {
            if (ipv4NetworkAddressArray[j - 1][i] !== ipv4NetworkAddressArray[j][i]) return i;
        }
    }
    // all octets are the same
    return -1;
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

// refactor: move common util
export function getNumberOfPaddingZero(octet: number): number {
    // 1 or 0
    if (octet < 2) return 7;
    // 3 -> 11
    else if (octet < 4) return 6;
    // 7 -> 111
    else if (octet < 8) return 5;
    // 15 -> 1111
    else if (octet < 16) return 4;
    // 31 -> 11111
    else if (octet < 32) return 3;
    // 63 -> 111111
    else if (octet < 64) return 2;
    // 127 -> 1111111
    else if (octet < 128) return 1;
    // 255 -> 11111111
    else return 0;
}
