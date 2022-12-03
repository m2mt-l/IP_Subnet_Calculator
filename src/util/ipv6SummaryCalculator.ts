import { DEFAULT_ROUTE } from "../data/ipv6SummaryDefaultValue";
import { IPv6Address } from "../model/IPv6Address";
import { ShortestSubnetData } from "../model/ShortestSubnetData";
import { hexToBinaryMap } from "./hexToBinary";
import {
    getStartAndEndIPv6Address,
    getFullIPv6Address,
    getShortenIPv6Address,
} from "./ipv6CalculatorUtil";

/*
    ipv6SummaryCalculator
    Calculate ipv4 address summary and follow the step below. Basically the same as ipv4.
    1. Get shortest subnet from ipv6SummaryArray
    2. Get first octet that has a different octet value
    3. Compare min and max value from calculatedOctetArray. That should be a required subnet.
    4. Compare calculatedSubnet and shortestSubnet.
       If shortestSubnet is shorter, return a network address having shortest subnet. If calculatedSubnet is shorter, get network address again.
*/
export function ipv6SummaryCalculator(ipv6SummaryArray: IPv6Address[], isShort: boolean): string {
    // 1. Get shortest subnet from ipv6SummaryArray
    const shortestSubnet: ShortestSubnetData = getShortestSubnet(ipv6SummaryArray);
    // subnet zero should be a default route
    if (shortestSubnet.subnet === 0) return DEFAULT_ROUTE;

    // Change all ipv6 addresses to start address, also need to change full ipv6 address
    // [["2001","0410","00a0","0000"...], ["2001","0410","00a1","0000"...], ...]
    const ipv6StartAddressArray: string[][] = ipv6SummaryArray.map(
        (ipv6) =>
            getStartAndEndIPv6Address(getFullIPv6Address(ipv6.ipAddress), ipv6.subnet)
                .startIPv6Address,
    );

    // 2. Get first octet that has a different octet value
    // 3 <- [["2001","0410","00a0","0000"...], ["2001","0410","00a1","0000"...], ...]
    const calculatedOctetIndex: number = getCalculatedOctetIndex(ipv6StartAddressArray);
    const shortestSubnetStartAddress: string[] = ipv6StartAddressArray[shortestSubnet.index];
    // if all octets are the same, return shortest subnet
    if (calculatedOctetIndex === -1)
        return getCalculatedOutputString(shortestSubnetStartAddress, shortestSubnet.subnet);
    // Get all calculated octet index values and change them to array
    // ["00a0", "00a1",...] <- [["2001","0410","00a0","0000"...], ["2001","0410","00a1","0000"...], ...]
    const calculatedOctetArray: string[] = getCalculatedOctetArray(
        ipv6StartAddressArray,
        calculatedOctetIndex,
    );

    // 3. Compare min and max value from calculatedOctetArray. That should be a required subnet.
    const calculatedSubnet: number = getCalculatedSubnet(
        calculatedOctetIndex,
        calculatedOctetArray,
    );

    // 4. Compare calculatedSubnet and shortestSubnet.

    interface OutputAddress {
        startAddress: string[];
        subnet: number;
    }

    const outputAddress: OutputAddress =
        // If shortestSubnet is shorter, return a network address having shortest subnet.
        shortestSubnet.subnet < calculatedSubnet
            ? { startAddress: shortestSubnetStartAddress, subnet: shortestSubnet.subnet }
            : // If calculatedSubnet is shorter, get network address again.
              {
                  startAddress: getStartAndEndIPv6Address(
                      shortestSubnetStartAddress,
                      calculatedSubnet.toString(),
                  ).startIPv6Address,
                  subnet: calculatedSubnet,
              };

    return isShort
        ? getCalculatedOutputString(
              getShortenIPv6Address(outputAddress.startAddress),
              outputAddress.subnet,
          )
        : getCalculatedOutputString(outputAddress.startAddress, outputAddress.subnet);
}

export function getShortestSubnet(ipv6SummaryArray: IPv6Address[]): ShortestSubnetData {
    const subnetArray: number[] = ipv6SummaryArray.map((ipv6) => parseInt(ipv6.subnet, 10));
    const shortestSubnet: number = Math.min(...subnetArray);
    return { subnet: shortestSubnet, index: subnetArray.indexOf(shortestSubnet) };
}

export function getCalculatedOctetIndex(ipv6StartAddressArray: string[][]): number {
    const ipv6AddressOctetLength = 8;
    for (let i = 0; i < ipv6AddressOctetLength; i++) {
        for (let j = 1; j < ipv6StartAddressArray.length; j++) {
            if (ipv6StartAddressArray[j - 1][i] !== ipv6StartAddressArray[j][i]) return i;
        }
    }
    // all octets are the same
    return -1;
}

export function getCalculatedOctetArray(
    ipv6StartAddressArray: string[][],
    index: number,
): string[] {
    const calculatedOctetArray: string[] = [];
    ipv6StartAddressArray.forEach((octet) => calculatedOctetArray.push(octet[index]));
    return calculatedOctetArray;
}

export function getCalculatedOutputString(startAddress: string[], subnet: number): string {
    return startAddress.join(":") + "/" + subnet.toString();
}

// octetIndex = 6(/48), calculatedOctetArray = ["00a0", "00a1","00a2"]
export function getCalculatedSubnet(octetIndex: number, calculatedOctetArray: string[]): number {
    // 3 <- ["00a0", "00a1","00a2"]
    const calculatedHexIndex: number = getCalculatedHexIndexFromOctet(calculatedOctetArray);
    // ["0","1","2"]
    const hexArray: string[] = calculatedOctetArray.map((octet) => octet[calculatedHexIndex]);
    const minHex: string = hexArray.reduce((prevValue, currentValue) =>
        parseInt(prevValue, 16) < parseInt(currentValue, 16) ? prevValue : currentValue,
    );
    const maxHex: string = hexArray.reduce((prevValue, currentValue) =>
        parseInt(prevValue, 16) > parseInt(currentValue, 16) ? prevValue : currentValue,
    );

    // key is an octet index, value is a subnet
    const hexSubnetHash: { [key: number]: number } = {
        0: 0,
        1: 4,
        2: 8,
        3: 12,
    };

    // key is an octet index, value is a subnet
    const octetSubnetHash: { [key: number]: number } = {
        0: 0,
        1: 16,
        2: 32,
        3: 48,
        4: 64,
        5: 80,
        6: 96,
        7: 112,
        8: 128,
    };
    const baseSubnet: number = octetSubnetHash[octetIndex] + hexSubnetHash[calculatedHexIndex];

    // 4 <- 0100
    const binaryMinHex: string = hexToBinaryMap[minHex];
    // 5 <- 0100
    const binaryMaxHex: string = hexToBinaryMap[maxHex];
    const countMaxBits: number = binaryMaxHex.length;
    for (let i = 0; i < countMaxBits; i++) {
        if (binaryMinHex[i] !== binaryMaxHex[i]) return baseSubnet + i;
    }
    return baseSubnet + countMaxBits;
}

// ["00a0", "00a1","00a2"...]
export function getCalculatedHexIndexFromOctet(calculatedOctetArray: string[]): number {
    const octetLength = 4;
    // chase octet index
    for (let octetIndex = 0; octetIndex < octetLength; octetIndex++) {
        // chase array index
        for (let arrayIndex = 1; arrayIndex < calculatedOctetArray.length; arrayIndex++) {
            if (
                calculatedOctetArray[arrayIndex - 1][octetIndex] !==
                calculatedOctetArray[arrayIndex][octetIndex]
            )
                return octetIndex;
        }
    }
    // all octets are the same
    return -1;
}
