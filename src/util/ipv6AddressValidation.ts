export function isValidIpv6Address(ipv6Address: string): boolean {
    // Regular expression to check if string is a IPv6 address
    const regexExp =
        /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/gi;

    return regexExp.test(ipv6Address);

    /*
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

    // If over 16 bit or :: includes over 2
    for (let i = 0; i < splitIpv6AddressLength; i++) {
        // over 16 bit
        if (splitIpv6Address[i].length > 4) return false;

        // :: includes over 2
        let zeroBitCount = 0;
        if (splitIpv6Address[i] === "") zeroBitCount++;
        if (zeroBitCount >= 2) return false;
    }

    return true;
    */
}

function isOnlyHex(ipv6Address: string): boolean {
    const hex = "0123456789abcdef";
    for (let i = 0; i < ipv6Address.length; i++) {
        if (!hex.includes(ipv6Address[i])) return false;
    }
    return true;
}
