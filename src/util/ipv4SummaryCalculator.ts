import { IPv4Address } from "../model/IPv4Address";
import { ShortestSubnetData } from "../model/ShortestSubnetData";
import { splitIPv4Address, splitSubnetMask, getIPv4NetworkAddress } from "./ipv4CalculatorUtil";
/*
    ipv4SummaryCalculator
    Calculate ipv4 address summary and follow the step below.
    1. Get shortest subnet from ipv4SummaryArray
    2. Get first octet that has a different octet value
    3. Compare min and max value from calculatedOctetArray. That should be the required number of hosts.
    4. Compare calculatedSubnet and shortestSubnet.
       If shortestSubnet is shorter, return a network address having shortest subnet. If calculatedSubnet is shorter, get network address again.
*/
export function ipv4SummaryCalculator(ipv4SummaryArray: IPv4Address[]): string {
    // 1. Get shortest subnet from ipv4SummaryArray
    const shortestSubnet: ShortestSubnetData = getShortestSubnet(ipv4SummaryArray);
    // subnet zero should be a default route
    if (shortestSubnet.subnet === 0) return "0.0.0.0/0";

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

    // 3. Compare min and max value from calculatedOctetArray. That should be the required number of hosts.
    const minOctet: number = Math.min(...calculatedOctetArray);
    const maxOctet: number = Math.max(...calculatedOctetArray);
    // This bit shows the required number of hosts
    const numberOfOneBit: number = getNumberOfOneBit(minOctet, maxOctet);
    // Get subnet from the required number of hosts
    const calculatedSubnet: number = getCalculatedSubnet(calculatedOctetIndex, numberOfOneBit);

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

export function getNumberOfOneBit(minN: number, maxN: number): number {
    const difference: number = maxN - minN;
    if (difference === 0)
        console.log("this should not happen because it is checked by getCalculatedOctetIndex");
    // 11111110
    if (difference < 2) return 7;
    // 11111100
    else if (difference < 4) return 6;
    // 11111000
    else if (difference < 8) return 5;
    // 11110000
    else if (difference < 16) return 4;
    // 11100000
    else if (difference < 32) return 3;
    // 11000000
    else if (difference < 64) return 2;
    // 10000000
    else if (difference < 128) return 1;
    // 00000000
    else return 0;
}

export function getCalculatedSubnet(octetIndex: number, numberOfOneBit: number): number {
    // key is an octet index, value is a subnet
    const octetSubnetHash: { [key: number]: number } = {
        0: 0,
        1: 8,
        2: 16,
        3: 24,
    };

    return octetSubnetHash[octetIndex] + numberOfOneBit;
}

export function getCalculatedOutputString(networkAddress: number[], subnet: number): string {
    return networkAddress.join(".") + "/" + subnet.toString();
}
