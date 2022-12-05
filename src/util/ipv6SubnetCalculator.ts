import { ipv6TypeKey, defaultStringValue, defaultNumberValue } from "../data/ipv6ResultTable";
import { IPv6Address } from "../model/IPv6Address";
import {
    getFullIPv6Address,
    getShortenIPv6Address,
    getStartAndEndIPv6Address,
} from "./ipv6CalculatorUtil";

export function ipv6SubnetCalculator(type: string, ipv6Address: IPv6Address): string {
    const ipv6CalculatorHashmap: { [key: string]: string } = {
        [ipv6TypeKey.ipAddress]: displayIPAddress(ipv6Address),
        [ipv6TypeKey.networkType]: getNetworkType(ipv6Address),
        [ipv6TypeKey.ipAddressRange]: getIPAddressRange(ipv6Address),
        [ipv6TypeKey.numberOfHosts]: getNumberOfHosts(ipv6Address),
    };
    return ipv6CalculatorHashmap[type];
}

/*
Calculator functions
 -displayIPAddress
 -getNetworkType
 -getIPAddressRange
 -getNumberOfHosts

These functions should be used in ipv6CalculatorHashmap.
The arguments are only ipv6Address(string) or subnet(string).
*/

function displayIPAddress(ipv6Address: IPv6Address): string {
    const { ipAddress, subnet, isShort } = ipv6Address;
    const fullIPv6Address: string[] = getFullIPv6Address(ipAddress);
    if (isShort) {
        return getShortenIPv6Address(fullIPv6Address).join(defaultStringValue.COLON) + "/" + subnet;
    } else return fullIPv6Address.join(defaultStringValue.COLON) + "/" + subnet;
}

// RFC 4291 Section 2.4
function getNetworkType(ipv6Address: IPv6Address): string {
    const { ipAddress } = ipv6Address;
    const fullIPv6Address: string[] = getFullIPv6Address(ipAddress);
    const headOctet: string = fullIPv6Address[0];
    const tailOctetIndex: number = fullIPv6Address.length - 1;
    // ff00
    if (headOctet === defaultStringValue.MULTICAST) return "Multicast";
    // fe80
    if (headOctet === defaultStringValue.LINK_LOCAL) return "Link-Local Unicast";

    // until 112 bits
    for (let i = 0; i < tailOctetIndex; i++) {
        if (fullIPv6Address[i] !== defaultStringValue.ZERO_FIELD) return "Global Unicast";
    }
    // for last 16 bits, :: or ::1
    return fullIPv6Address[tailOctetIndex] === defaultStringValue.ZERO_FIELD
        ? "Unspecified"
        : "Loopback";
}

function getIPAddressRange(ipv6Address: IPv6Address): string {
    const { ipAddress, subnet, isShort } = ipv6Address;
    const fullIPv6Address: string[] = getFullIPv6Address(ipAddress);
    const { startIPv6Address, endIPv6Address } = getStartAndEndIPv6Address(fullIPv6Address, subnet);

    if (isShort) {
        return (
            getShortenIPv6Address(startIPv6Address).join(defaultStringValue.COLON) +
            " - " +
            getShortenIPv6Address(endIPv6Address).join(defaultStringValue.COLON)
        );
    } else {
        return (
            startIPv6Address.join(defaultStringValue.COLON) +
            " - " +
            endIPv6Address.join(defaultStringValue.COLON)
        );
    }
}

function getNumberOfHosts(ipv6Address: IPv6Address): string {
    const { subnet } = ipv6Address;
    const totalBits: number = defaultNumberValue.MAX_NUMBER_OF_BITS - parseInt(subnet, 10);
    const numberOfHosts: bigint = totalBits < 1 ? BigInt(1) : BigInt(Math.pow(2, totalBits));
    return numberOfHosts.toLocaleString();
}
