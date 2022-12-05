import { ipv4TypeKey } from "../data/ipv4ResultTable";
import { ipv4SubnetHashMap } from "../data/ipv4Subnet";
import {
    CLASS_A_FIRST_OCTET_END,
    CLASS_A_FIRST_OCTET_START,
    CLASS_B_FIRST_OCTET_END,
    CLASS_B_FIRST_OCTET_START,
    CLASS_C_FIRST_OCTET_END,
    CLASS_C_FIRST_OCTET_START,
    CLASS_D_FIRST_OCTET_END,
    CLASS_D_FIRST_OCTET_START,
    PRIVATE_CLASS_A_FIRST_OCTET,
    PRIVATE_CLASS_B_FIRST_OCTET,
    PRIVATE_CLASS_B_SECOND_OCTET_END,
    PRIVATE_CLASS_B_SECOND_OCTET_START,
    PRIVATE_CLASS_C_FIRST_OCTET,
    PRIVATE_CLASS_C_SECOND_OCTET,
} from "../data/ipv4SubnetDefaultValue";
import { defaultIPv4Address } from "../data/ipv4SummaryDefaultValue";
import { IPv4Address } from "../model/IPv4Address";
import {
    splitIPv4Address,
    splitSubnetMask,
    operateAND,
    operateOR,
    getWildcardMaskArray,
    countBits,
    getHexAddressFromIPv4Address,
    getIPv4NetworkAddress,
} from "./ipv4CalculatorUtil";

export function ipv4SubnetCalculator(type: string, ipv4Address: IPv4Address): string {
    const { ipAddress, subnet } = ipv4Address;
    const ipv4CalculatorHashmap: { [key: string]: string } = {
        [ipv4TypeKey.ipAddress]: displayIPv4Address(ipAddress, subnet),
        [ipv4TypeKey.networkAddress]: getIPv4NetworkAddressForSubnetCalc(ipAddress, subnet),
        [ipv4TypeKey.hostAddressRange]: getIPv4HostAddressRange(ipAddress, subnet),
        [ipv4TypeKey.numberOfHosts]: getIPv4NumberOfHosts(subnet),
        [ipv4TypeKey.broadcastAddress]: getIPv4BroadcastAddress(ipAddress, subnet),
        [ipv4TypeKey.subnetMask]: getIPv4SubnetMask(subnet),
        [ipv4TypeKey.ipType]: getIPv4Type(ipAddress),
        [ipv4TypeKey.networkClass]: getIPv4NetworkClass(ipAddress),
        [ipv4TypeKey.ipv4Mapped]: getIPv4MappedAddress(ipAddress),
        [ipv4TypeKey.sixToFour]: getSixToFourAddress(ipAddress),
    };
    return ipv4CalculatorHashmap[type];
}

/*
Calculator functions
 -displayIPAddress
 -getNetworkAddress
 -getHostAddressRange
 -getNumberOfHosts
 -getBroadcastAddress
 -getSubnetMask
 -getIPType
 -getNetworkClass
 -getIpv4MappedAddress
 -getSixToFourAddress
These functions should be used in ipv4CalculatorHashmap.
The arguments are only ipv4Address(string) or subnet(string).
*/

// Show IP address and CIDR
function displayIPv4Address(ipv4Address: string, subnet: string): string {
    return ipv4Address + "/" + subnet;
}

function getIPv4NetworkAddressForSubnetCalc(ipv4Address: string, subnet: string): string {
    const ipv4AddressArray: number[] = splitIPv4Address(ipv4Address);
    const subnetArray: number[] = splitSubnetMask(subnet);

    return getIPv4NetworkAddress(ipv4AddressArray, subnetArray).join(".");
}

function getIPv4HostAddressRange(ipv4Address: string, subnet: string): string {
    // /31 or /32
    if (parseInt(subnet, 10) >= 31) return "N/A";

    const ipv4AddressArray: number[] = splitIPv4Address(ipv4Address);
    const subnetArray: number[] = splitSubnetMask(subnet);
    const wildcardArray: number[] = getWildcardMaskArray(splitSubnetMask(subnet));

    const tailIndexFirstHost: number = defaultIPv4Address.length - 1;
    // network address
    const firstHostAddressArray: number[] = defaultIPv4Address.map((octet, index) =>
        operateAND(ipv4AddressArray[index], subnetArray[index]),
    );
    firstHostAddressArray[tailIndexFirstHost] += 1;

    const tailIndexLastHost: number = defaultIPv4Address.length - 1;
    // broadcast address
    const lastHostAddressArray: number[] = defaultIPv4Address.map((octet, index) =>
        operateOR(ipv4AddressArray[index], wildcardArray[index]),
    );
    lastHostAddressArray[tailIndexLastHost] -= 1;

    return firstHostAddressArray.join(".") + " - " + lastHostAddressArray.join(".");
}

function getIPv4NumberOfHosts(subnet: string): string {
    const wildcardArray: number[] = getWildcardMaskArray(splitSubnetMask(subnet));
    const bitCountArray: number[] = wildcardArray.map((octet: number) => countBits(octet));
    const totalBits: number = bitCountArray.reduce((total: number, bit: number) => total + bit);
    // /32 or /31 (totalBits == 1) is 0
    const numberOfHosts: number = totalBits <= 1 ? 0 : Math.pow(2, totalBits) - 2;
    return numberOfHosts.toLocaleString();
}

function getIPv4BroadcastAddress(ipv4Address: string, subnet: string): string {
    const ipv4AddressArray: number[] = splitIPv4Address(ipv4Address);
    const wildcardArray: number[] = getWildcardMaskArray(splitSubnetMask(subnet));

    const broadcastAddress = defaultIPv4Address.map((octet, index) =>
        operateOR(ipv4AddressArray[index], wildcardArray[index]),
    );

    return broadcastAddress.join(".");
}

function getIPv4SubnetMask(subnet: string): string {
    return ipv4SubnetHashMap[subnet];
}

function getIPv4Type(ipv4Address: string): string {
    const ipv4AddressArray: number[] = splitIPv4Address(ipv4Address);
    const firstOctet: number = ipv4AddressArray[0];
    const secondOctet: number = ipv4AddressArray[1];
    const isPrivate = (firstOctet: number, secondOctet: number): boolean => {
        // Private Class A
        if (firstOctet === PRIVATE_CLASS_A_FIRST_OCTET) return true;
        // Private Class B
        else if (
            firstOctet === PRIVATE_CLASS_B_FIRST_OCTET &&
            secondOctet >= PRIVATE_CLASS_B_SECOND_OCTET_START &&
            secondOctet <= PRIVATE_CLASS_B_SECOND_OCTET_END
        )
            return true;
        // Private Class C
        else if (
            firstOctet === PRIVATE_CLASS_C_FIRST_OCTET &&
            secondOctet === PRIVATE_CLASS_C_SECOND_OCTET
        )
            return true;
        // Global
        else return false;
    };

    return isPrivate(firstOctet, secondOctet) ? "Private" : "Global";
}

function getIPv4NetworkClass(ipv4Address: string): string {
    const ipv4AddressArray: number[] = splitIPv4Address(ipv4Address);
    const firstOctet: number = ipv4AddressArray[0];

    if (firstOctet >= CLASS_A_FIRST_OCTET_START && firstOctet <= CLASS_A_FIRST_OCTET_END)
        return "A";
    else if (firstOctet >= CLASS_B_FIRST_OCTET_START && firstOctet <= CLASS_B_FIRST_OCTET_END)
        return "B";
    else if (firstOctet >= CLASS_C_FIRST_OCTET_START && firstOctet <= CLASS_C_FIRST_OCTET_END)
        return "C";
    else if (firstOctet >= CLASS_D_FIRST_OCTET_START && firstOctet <= CLASS_D_FIRST_OCTET_END)
        return "D(Multicast)";
    // firstOctet >= 240 && firstOctet <= 255
    else return "E";
}

// RFC4291 section 2.5.5.2, for the usage refer to RFC4038
function getIPv4MappedAddress(ipv4Address: string): string {
    const firstIpv4MappedAddress = "::ffff:";
    return firstIpv4MappedAddress + getHexAddressFromIPv4Address(ipv4Address);
}

// RFC3056
function getSixToFourAddress(ipv4Address: string): string {
    const firstSixToFourAddress = "2002:";
    const lastSixToFourAddress = "::/48";
    return firstSixToFourAddress + getHexAddressFromIPv4Address(ipv4Address) + lastSixToFourAddress;
}
