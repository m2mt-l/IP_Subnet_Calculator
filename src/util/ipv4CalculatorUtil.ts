import { ipv4SubnetHashMap } from "../data/ipv4Subnet";
import { defaultIPv4Address } from "../data/ipv4SummaryDefaultValue";

export function splitIPv4Address(ipv4Address: string): number[] {
    return ipv4Address.split(".").map((octet) => parseInt(octet, 10));
}

export function splitSubnetMask(subnet: string): number[] {
    return ipv4SubnetHashMap[subnet].split(".").map((octet) => parseInt(octet, 10));
}

export function operateAND(n1: number, n2: number): number {
    return (n1 &= n2);
}

export function operateOR(n1: number, n2: number): number {
    return (n1 |= n2);
}

// ex: subnetArray = [255,255,255,0] return [0,0,0,255]
export function getWildcardMaskArray(subnetArray: number[]): number[] {
    return subnetArray.map((subnet) => 255 - subnet);
}

export function countBits(subnet: number): number {
    const bitArray: string[] | null = subnet.toString(2).match(/1/g);
    return bitArray !== null ? bitArray.length : 0;
}

// For getHexAddressFromIPv4Address
function getHexFromDecimal(decimal: number): string {
    return decimal < 16 ? "0" + decimal.toString(16) : decimal.toString(16);
}

export function getHexAddressFromIPv4Address(ipv4Address: string): string {
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

export function getIPv4NetworkAddress(ipv4Address: number[], subnet: number[]): number[] {
    const networkAddress = defaultIPv4Address.map((octet, index) =>
        operateAND(ipv4Address[index], subnet[index]),
    );
    return networkAddress;
}

export function getNumberOfZeroBits(octet: number): number {
    // 00000000
    if (octet === 0) return 8;
    // 00000001
    else if (octet === 1) return 7;
    // 00000011
    else if (octet < 4) return 6;
    // 00000111
    else if (octet < 8) return 5;
    // 00001111
    else if (octet < 16) return 4;
    // 00011111
    else if (octet < 32) return 3;
    // 00111111
    else if (octet < 64) return 2;
    // 01111111
    else if (octet < 128) return 1;
    // 11111111
    else return 0;
}
