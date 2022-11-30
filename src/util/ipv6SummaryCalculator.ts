import { IPv6Address } from "../model/IPv6Address";
import { ShortestSubnetData } from "../model/ShortestSubnetData";
import { defaultStringValue } from "../data/ipv6ResultTable";
import { getStartAndEndIPv6Address } from "./ipv6CalculatorUtil";
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
    const ipv6StartAddressArray: string[][] = ipv6SummaryArray.map(
        (ipv6) =>
            getStartAndEndIPv6Address(ipv6.ipAddress.split(defaultStringValue.colon), ipv6.subnet)
                .startIPv6Address,
    );

    // 2. Get first octet that has a different octet value
    const calculatedOctetIndex: number = getCalculatedOctetIndex(ipv6StartAddressArray);
    const shortestSubnetStartAddress: string[] = ipv6StartAddressArray[shortestSubnet.index];
    // if all octets are the same, return shortest subnet
    if (calculatedOctetIndex === -1)
        return getCalculatedOutputString(shortestSubnetStartAddress, shortestSubnet.subnet);
    // Get all calculated octet index values and change them to array
    const calculatedOctetArray: string[] = getCalculatedOctetArray(
        ipv6StartAddressArray,
        calculatedOctetIndex,
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
