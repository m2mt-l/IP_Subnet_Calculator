import { defaultRoute } from "../data/ipv4SummaryDefaultValue";
import { IPv4Address } from "../model/IPv4Address";
import { ShortestSubnetData } from "../model/ShortestSubnetData";
import {
    splitIPv4Address,
    splitSubnetMask,
    getIPv4NetworkAddress,
    getNumberOfZeroBits,
} from "./ipv4CalculatorUtil";

/*
    ipv4SummaryCalculator
    Calculate ipv4 address summary and follow the step below.
    1. Get shortest subnet from ipv4SummaryArray
    2. Get first octet that has a different octet value
    3. Compare min and max value from calculatedOctetArray. That should be a required subnet.
    4. Compare calculatedSubnet and shortestSubnet.
       If shortestSubnet is shorter, return a network address having shortest subnet. If calculatedSubnet is shorter, get network address again.
*/
export function ipv4SummaryCalculator(ipv4SummaryArray: IPv4Address[]): string {
    // 1. Get shortest subnet from ipv4SummaryArray
    const shortestSubnet: ShortestSubnetData = getShortestSubnet(ipv4SummaryArray);
    // subnet zero should be a default route
    if (shortestSubnet.subnet === 0) return defaultRoute;

    // Change all ipv4 addresses to network addresses
    // [10,2,0,0],[10,2,1,0],[10,2,2,0],[10,2,3,0] -> /24
    const ipv4NetworkAddressArray: number[][] = ipv4SummaryArray.map((ipv4) =>
        getIPv4NetworkAddressForSummary(ipv4),
    );

    // 2. Get first octet that has a different octet value
    // 2 -> [10,2,0,0],[10,2,1,0],[10,2,2,0],[10,2,3,0]
    const calculatedOctetIndex: number = getCalculatedOctetIndex(ipv4NetworkAddressArray);

    const shortestSubnetNetworkAddress: number[] = ipv4NetworkAddressArray[shortestSubnet.index];

    // if all octets are the same, return shortest subnet
    if (calculatedOctetIndex === -1)
        return getCalculatedOutputString(shortestSubnetNetworkAddress, shortestSubnet.subnet);
    // Get all calculated octet index values and change them to array
    const calculatedOctetArray: number[] = getCalculatedOctetArray(
        ipv4NetworkAddressArray,
        calculatedOctetIndex,
    );

    // 3. Compare min and max value from calculatedOctetArray. That should be a required subnet.
    const calculatedSubnet: number = getCalculatedSubnet(
        calculatedOctetIndex,
        calculatedOctetArray,
    );

    // 4. Compare calculatedSubnet and shortestSubnet.
    // If shortestSubnet is shorter, return a network address having shortest subnet. If calculatedSubnet is shorter, get network address again.
    interface OutputAddress {
        networkAddress: number[];
        subnet: number;
    }

    const outputAddress: OutputAddress =
        shortestSubnet.subnet < calculatedSubnet
            ? { networkAddress: shortestSubnetNetworkAddress, subnet: shortestSubnet.subnet }
            : {
                  networkAddress: getOutputNetworkAddress(
                      shortestSubnetNetworkAddress,
                      calculatedSubnet,
                  ),
                  subnet: calculatedSubnet,
              };
    return getCalculatedOutputString(outputAddress.networkAddress, outputAddress.subnet);
}

export function getShortestSubnet(ipv4SummaryArray: IPv4Address[]): ShortestSubnetData {
    const subnetArray: number[] = ipv4SummaryArray.map((ipv4) => parseInt(ipv4.subnet, 10));
    const shortestSubnet: number = Math.min(...subnetArray);
    return { subnet: shortestSubnet, index: subnetArray.indexOf(shortestSubnet) };
}

export function getIPv4NetworkAddressForSummary(ipv4: IPv4Address): number[] {
    const ipv4AddressArray: number[] = splitIPv4Address(ipv4.ipAddress);
    const subnetArray: number[] = splitSubnetMask(ipv4.subnet);

    return getIPv4NetworkAddress(ipv4AddressArray, subnetArray);
}

export function getOutputNetworkAddress(ipAddress: number[], subnet: number): number[] {
    const subnetArray: number[] = splitSubnetMask(subnet.toString());
    return getIPv4NetworkAddress(ipAddress, subnetArray);
}

/*
    [10,2,0,0],[10,2,1,0],[10,2,2,0],[10,2,3,0]
    [0][0] -> [1][0] -> [2][0] -> [3][0] -> [0][1] -> [1][1]...
*/
export function getCalculatedOctetIndex(ipv4NetworkAddressArray: number[][]): number {
    const ipv4AddressOctetLength = 4;
    for (let i = 0; i < ipv4AddressOctetLength; i++) {
        for (let j = 1; j < ipv4NetworkAddressArray.length; j++) {
            if (ipv4NetworkAddressArray[j - 1][i] !== ipv4NetworkAddressArray[j][i]) return i;
        }
    }
    // all octets are the same
    return -1;
}

/*
    [[10,2,0,0],[10,2,1,0],[10,2,2,0],[10,2,3,0]] , 3
    [0,1,2,3]
*/
export function getCalculatedOctetArray(
    ipv4NetworkAddressArray: number[][],
    index: number,
): number[] {
    const calculatedOctetArray: number[] = [];
    ipv4NetworkAddressArray.forEach((octet) => calculatedOctetArray.push(octet[index]));
    return calculatedOctetArray;
}

export function getCalculatedSubnet(octetIndex: number, calculatedOctetArray: number[]): number {
    // 4
    const minOctet: number = Math.min(...calculatedOctetArray);
    // 5
    const maxOctet: number = Math.max(...calculatedOctetArray);
    // 5 -> 00000100
    const countMinZeroBits: number = getNumberOfZeroBits(minOctet);
    // 5 -> 00000101
    const countMaxZeroBits: number = getNumberOfZeroBits(maxOctet);
    // This should be the same bit count for both cases.
    const paddingZeroBits: number = countMaxZeroBits;
    // key is an octet index, value is a subnet
    const octetSubnetHash: { [key: number]: number } = {
        0: 0,
        1: 8,
        2: 16,
        3: 24,
    };
    const baseSubnet: number = octetSubnetHash[octetIndex] + paddingZeroBits;

    if (countMinZeroBits === countMaxZeroBits) {
        // If zero bits length between max and min octets are the same, check binary bits after the one bit.
        const binaryMinOctet: string = minOctet.toString(2);
        const binaryMaxOctet: string = maxOctet.toString(2);
        const countMaxBits: number = binaryMaxOctet.length;
        for (let i = 0; i < countMaxBits; i++) {
            if (binaryMinOctet[i] !== binaryMaxOctet[i]) return baseSubnet + i;
        }
        return baseSubnet + countMaxBits;
    } else {
        // If any difference between them, the subnet length should be the same as the max octet.
        return baseSubnet;
    }
}

export function getCalculatedOutputString(networkAddress: number[], subnet: number): string {
    return networkAddress.join(".") + "/" + subnet.toString();
}
