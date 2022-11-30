import { IPv6Address } from "../model/IPv6Address";
import { ShortestSubnetData } from "../model/ShortestSubnetData";
import { defaultStringValue } from "../data/ipv6ResultTable";
import { getStartAndEndIPv6Address } from "./ipv6CalculatorUtil";
import { hexToBinaryMap } from "./hexToBinary";

/*
    ipv6SummaryCalculator
    Calculate ipv4 address summary and follow the step below. Basically the same as ipv4.
    1. Get shortest subnet from ipv6SummaryArray
    2. Get first octet that has a different octet value
    3. Compare min and max value from calculatedOctetArray. That should be a required subnet.
    4. Compare calculatedSubnet and shortestSubnet.
       If shortestSubnet is shorter, return a network address having shortest subnet. If calculatedSubnet is shorter, get network address again.
*/
export function ipv6SummaryCalculator(ipv6SummaryArray: IPv6Address[]): string {
    // 1. Get shortest subnet from ipv6SummaryArray
    const shortestSubnet: ShortestSubnetData = getShortestSubnet(ipv6SummaryArray);
    // subnet zero should be a default route
    // if (shortestSubnet.subnet === 0) return defaultRoute;

    // Change all ipv6 addresses to start address
    // [["2001","0410","00a0","0000"...], ["2001","0410","00a1","0000"...], ...]
    const ipv6StartAddressArray: string[][] = ipv6SummaryArray.map(
        (ipv6) =>
            getStartAndEndIPv6Address(ipv6.ipAddress.split(defaultStringValue.colon), ipv6.subnet)
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

    return "";
}

export function getShortestSubnet(ipv6SummaryArray: IPv6Address[]): ShortestSubnetData {
    const subnetArray: number[] = ipv6SummaryArray.map((ipv6) => parseInt(ipv6.subnet, 10));
    const shortestSubnet: number = Math.min(...subnetArray);
    return { subnet: shortestSubnet, index: subnetArray.indexOf(shortestSubnet) };
}

export function getCalculatedOctetIndex(ipv6StartAddressArray: string[][]): number {
    const ipv6AddressOctetLength = 4;
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

// ["00a0", "00a1","00a2"...]
export function getCalculatedSubnet(octetIndex: number, calculatedOctetArray: string[]): number {
    const calculatedHexIndex: number = getCalculatedHexIndexFromOctet(calculatedOctetArray);
    // ["0","1","2"]
    const hexArray: string[] = calculatedOctetArray.map((octet) => octet[calculatedHexIndex]);
    const minHex: string = hexArray.reduce((prevValue, currentValue) =>
        parseInt(prevValue, 16) < parseInt(currentValue, 16) ? prevValue : currentValue,
    );
    const maxHex: string = hexArray.reduce((prevValue, currentValue) =>
        parseInt(prevValue, 16) > parseInt(currentValue, 16) ? prevValue : currentValue,
    );
    const countMinZeroBits: number = getNumberOfZeroBits(minHex);
    const countMaxZeroBits: number = getNumberOfZeroBits(maxHex);

    // This should be the same bit count for both cases.
    const paddingZeroBits: number = countMaxZeroBits;
    // key is an octet index, value is a subnet
    const octetSubnetHash: { [key: number]: number } = {
        0: 0,
        1: 8,
        2: 16,
        3: 24,
        4: 32,
        5: 40,
        6: 48,
        7: 56,
        8: 64,
        9: 72,
        10: 80,
        11: 88,
        12: 96,
        13: 104,
        14: 112,
        15: 120,
        16: 128,
    };
    const baseSubnet: number = octetSubnetHash[octetIndex] + paddingZeroBits;

    if (countMinZeroBits === countMaxZeroBits) {
        // If zero bits length between max and min octets are the same, check binary bits after the one bit.
        const binaryMinHex: string = hexToBinaryMap[minHex];
        const binaryMaxHex: string = hexToBinaryMap[maxHex];
        const countMaxBits: number = binaryMaxHex.length;
        for (let i = 0; i < countMaxBits; i++) {
            if (binaryMinHex[i] !== binaryMaxHex[i]) return baseSubnet + i;
        }
        return baseSubnet + countMaxBits;
    } else {
        // If any difference between them, the subnet length should be the same as the max octet.
        return baseSubnet;
    }
}

// ["00a0", "00a1","00a2"...]
export function getCalculatedHexIndexFromOctet(calculatedOctetArray: string[]): number {
    const octetLength: number = 4;
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

function getNumberOfZeroBits(hex: string): number {
    const decimal: number = parseInt(hex, 16);
    // 0000
    if (decimal === 0) return 4;
    // 0001
    else if (decimal === 1) return 3;
    // 0010 - 0011
    else if (decimal < 3) return 2;
    // 0100 - 0111
    else if (decimal < 8) return 1;
    // 1000 - 1111
    else return 0;
}
