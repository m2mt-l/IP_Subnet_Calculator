export function isValidIpv6Address(ipv4Address: string): boolean {
    // 2001:db8::

    // ["2001", "db8", ""]
    const splitIpv6Address: string[] = ipv4Address.split(":");
    const splitIpv6AddressLength: number = splitIpv6Address.length;

    // Check proper bit(<= 8(128 bit))
    if (splitIpv6AddressLength > 8) return false;

    // false statement
    // If the value is not hex
    // If "" is over 2

    /*
    // Check the octet value is correct
    for (let i = 0; i < splitIpv4AddressLength; i++) {
        const octetValue = Number(splitIpv4Address[i]);
        // Check if this is Number
        if (isNaN(octetValue)) return false;
        // Check if the octet range is from 0 to 255
        if (octetValue < 0 || octetValue > 255) return false;
    }
*/
    return true;
}
