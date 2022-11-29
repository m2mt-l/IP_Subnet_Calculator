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

    return "";
}

export function getShortestSubnet(ipv6SummaryArray: IPv6Address[]): ShortestSubnetData {
    const subnetArray: number[] = ipv6SummaryArray.map((ipv6) => parseInt(ipv6.subnet, 10));
    const shortestSubnet: number = Math.min(...subnetArray);
    return { subnet: shortestSubnet, index: subnetArray.indexOf(shortestSubnet) };
}
