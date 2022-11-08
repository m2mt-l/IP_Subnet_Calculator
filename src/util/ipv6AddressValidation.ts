export function isValidIpv6Address(ipv6Address: string): boolean {
    // If colons do not include
    if (!ipv6Address.includes(":")) return false;

    // 2001:db8::

    // 2001db8
    const ipv6AddressWithoutColon: string = ipv6Address.replace(/:/g, "");
    // If the value is not hex
    if (!isOnlyHex(ipv6AddressWithoutColon)) return false;

    // ["2001", "db8", ""]
    const splitIpv6Address: string[] = ipv6Address.split(":");
    const splitIpv6AddressLength: number = splitIpv6Address.length;

    // Check correct bit(128 bit)
    if (splitIpv6AddressLength > 8) return false;

    // If "" is over 2(:: includes over 2)
    for (let i = 0; i < splitIpv6AddressLength; i++) {
        let zeroBitCount = 0;
        if (splitIpv6Address[i] === "") zeroBitCount++;
        if (zeroBitCount >= 2) return false;
    }

    return true;
}

function isOnlyHex(ipv6Address: string): boolean {
    const hex = "0123456789abcdef";
    for (let i = 0; i < ipv6Address.length; i++) {
        if (!hex.includes(ipv6Address[i])) return false;
    }
    return true;
}
