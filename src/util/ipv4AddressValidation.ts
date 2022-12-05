import { IPv4Address } from "../model/IPv4Address";

export function isValidIpv4Address(ipv4Address: string): boolean {
    const splitIpv4Address: string[] = ipv4Address.split(".");
    const splitIpv4AddressLength: number = splitIpv4Address.length;

    // Check proper dot number(== 4(32 bit))
    if (splitIpv4AddressLength !== 4) return false;

    // Check the octet value is correct
    for (const octetValueString of splitIpv4Address) {
        const octetValue: number = parseInt(octetValueString, 10);
        // Check if this is Number
        if (isNaN(octetValue)) return false;
        // Check if the octet range is from 0 to 255
        if (octetValue < 0 || octetValue > 255) return false;
    }
    return true;
}

export function checkAllValidIPv4AddressesExist(ipv4Array: IPv4Address[]): boolean {
    for (let i = 0; i < ipv4Array.length; i++) {
        const { ipAddress } = ipv4Array[i];
        if (!isValidIpv4Address(ipAddress)) return false;
    }
    return true;
}
