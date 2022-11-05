export function isValidIpv4Address(ipv4Address: string): boolean {
    const splitIpv4Address: string[] = ipv4Address.split(".");
    const splitIpv4AddressLength: number = splitIpv4Address.length;

    // Check proper dot number(==4)
    if (splitIpv4AddressLength !== 4) return false;

    // Check the octet value is correct
    for (let i = 0; i < splitIpv4AddressLength; i++) {
        const octetValue = Number(splitIpv4Address[i]);
        // Check if this is Number
        if (isNaN(octetValue)) return false;
        // Check if the octet range is from 0 to 255
        if (octetValue < 0 && octetValue > 255) return false;
    }
    return true;
}
