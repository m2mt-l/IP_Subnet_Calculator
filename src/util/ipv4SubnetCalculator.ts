import { ipv4TypeKey } from "../data/ipv4ResultTable";
import { ipv4SubnetHashMap } from "../data/ipv4Subnet";
import { IPv4Address } from "../model/IPv4Address";

export function ipv4Calculator(type: string, ipv4Address: IPv4Address): string {
    const { ipAddress, subnet } = ipv4Address;
    const ipv4CalculatorHashmap: { [key: string]: string } = {
        [ipv4TypeKey.ipAddress]: displayIPv4Address(ipAddress, subnet),
        [ipv4TypeKey.networkAddress]: getIPv4NetworkAddress(ipAddress, subnet),
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

function getIPv4NetworkAddress(ipv4Address: string, subnet: string): string {
    const ipv4AddressArray: number[] = splitIPv4Address(ipv4Address);
    const subnetArray: number[] = splitSubnetMask(subnet);

    const networkAddress = [0, 0, 0, 0].map((octet, index) =>
        operateAND(ipv4AddressArray[index], subnetArray[index]),
    );

    return networkAddress.join(".");
}

function getIPv4HostAddressRange(ipv4Address: string, subnet: string): string {
    // /31 or /32
    if (parseInt(subnet, 10) >= 31) return "N/A";

    const ipv4AddressArray: number[] = splitIPv4Address(ipv4Address);
    const subnetArray: number[] = splitSubnetMask(subnet);
    const wildcardArray: number[] = getWildcardMaskArray(splitSubnetMask(subnet));

    let firstHostAddressArray: number[] = [0, 0, 0, 0];
    const tailIndexFirstHost: number = firstHostAddressArray.length - 1;
    // network address
    firstHostAddressArray = firstHostAddressArray.map((octet, index) =>
        operateAND(ipv4AddressArray[index], subnetArray[index]),
    );
    firstHostAddressArray[tailIndexFirstHost] += 1;

    let lastHostAddressArray: number[] = [0, 0, 0, 0];
    const tailIndexLastHost: number = lastHostAddressArray.length - 1;
    // broadcast address
    lastHostAddressArray = lastHostAddressArray.map((octet, index) =>
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

    const broadcastAddress = [0, 0, 0, 0].map((octet, index) =>
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
        if (firstOctet === 10) return true;
        // Private Class B
        else if (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) return true;
        // Private Class C
        else if (firstOctet === 192 && secondOctet === 168) return true;
        // Global
        else return false;
    };

    return isPrivate(firstOctet, secondOctet) ? "Private" : "Global";
}

function getIPv4NetworkClass(ipv4Address: string): string {
    const ipv4AddressArray: number[] = splitIPv4Address(ipv4Address);
    const firstOctet: number = ipv4AddressArray[0];

    if (firstOctet >= 0 && firstOctet <= 127) return "A";
    else if (firstOctet >= 128 && firstOctet <= 191) return "B";
    else if (firstOctet >= 192 && firstOctet <= 223) return "C";
    else if (firstOctet >= 224 && firstOctet <= 239) return "D(Multicast)";
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

/*
Operation functions
These functions are used in Calculator functions.
*/

// [192, 168, 0, 1]
function splitIPv4Address(ipv4Address: string): number[] {
    return ipv4Address.split(".").map((octet) => parseInt(octet, 10));
}

// [255, 255, 255, 0]
function splitSubnetMask(subnet: string): number[] {
    return getIPv4SubnetMask(subnet)
        .split(".")
        .map((octet) => parseInt(octet, 10));
}

// bitwise AND operation
function operateAND(n1: number, n2: number): number {
    return (n1 &= n2);
}

// bitwise OR operation
function operateOR(n1: number, n2: number): number {
    return (n1 |= n2);
}

// ex: subnetArray = [255,255,255,0] return [0,0,0,255]
function getWildcardMaskArray(subnetArray: number[]): number[] {
    return subnetArray.map((subnet) => 255 - subnet);
}

function countBits(subnet: number): number {
    const bitArray: string[] | null = subnet.toString(2).match(/1/g);
    return bitArray !== null ? bitArray.length : 0;
}

function getHexFromDecimal(decimal: number): string {
    return decimal < 16 ? "0" + decimal.toString(16) : decimal.toString(16);
}

function getHexAddressFromIPv4Address(ipv4Address: string): string {
    // [192,168,0,1]
    const ipv4AddressArray: number[] = splitIPv4Address(ipv4Address);
    const firstIndex = 0;
    const middleIndex = ipv4AddressArray.length / 2;
    const lastIndex = ipv4AddressArray.length;

    // first half [C0,A8]
    const firstHalfHex: string[] = ipv4AddressArray
        .slice(firstIndex, middleIndex)
        .map((decimal: number) => getHexFromDecimal(decimal));

    // later half [00, 01]
    const laterHalfHex: string[] = ipv4AddressArray
        .slice(middleIndex, lastIndex)
        .map((decimal: number) => getHexFromDecimal(decimal));

    // C0A8.0001
    return firstHalfHex.join("") + "." + laterHalfHex.join("");
}
