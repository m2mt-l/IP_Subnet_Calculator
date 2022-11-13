import { ipv6TypeKey } from "../data/ipv6ResultTable";

export function ipv6Calculator(type: string, ipv6Address: string, subnet: string): string {
    const ipv6CalculatorHashmap: { [key: string]: string } = {
        [ipv6TypeKey.ipAddress]: displayIPAddress(ipv6Address, subnet),
        [ipv6TypeKey.network]: "network",
        [ipv6TypeKey.ipAddressRange]: "ip address range",
        [ipv6TypeKey.numberOfHosts]: "number of hosts",
    };
    return ipv6CalculatorHashmap[type];
}

/*
Calculator functions

These functions should be used in ipv6CalculatorHashmap.
The arguments are only ipv6Address(string) or subnet(string).
*/

// 2001:db8::
// 16bit * 8
// hex ["0000", "0000", "0000", "0000", "0000", "0000", "0000", "0000"]
// binary ["0000000000000000",....]
// Math.ceil(subnet / 16) == Index
// subnet % 16 == bit
// 0 - 16 : 0
// 17 - 32 : 1
// 33 - 48 : 2
// 49 - 64 : 3
// 65 - 80 : 4
// 81 - 96 : 5
// 97 - 112 : 6
// 113 - 128 : 7

function displayIPAddress(ipv6Address: string, subnet: string): string {
    const splitIPv6address: string[] = ipv6Address.split(":");
    if (splitIPv6address.length === 8) return ipv6Address + " /" + subnet;
    else return getFullIPv6Address(ipv6Address).join(":") + " /" + subnet;
}

/*
Operation functions
These functions are used in Calculator functions.
*/

function getFullIPv6Address(ipv6Address: string): string[] {
    // ["2001", "db8", "", ""]
    // ["2001", "db8", "", "1"]
    const splitIPv6address: string[] = ipv6Address.split(":");
    const fullIPv6AddressLength = 8;
    // 6
    // 5
    const numberOfZeroOctet: number =
        fullIPv6AddressLength -
        splitIPv6address.filter((octet: string) => {
            return octet !== "";
        }).length;
    const tailOctetIndex: number = splitIPv6address.length - 1;
    const zeroIndex: number = splitIPv6address.indexOf("");
    const paddingZero = "0000";

    const fullIPv6Address: string[] = [];

    // no zero bit
    if (zeroIndex === -1) {
        for (let i = 0; i <= tailOctetIndex; i++) {
            paddingAddress(fullIPv6Address, splitIPv6address[i]);
        }
        return fullIPv6Address;
    }

    // push before zero bit
    // ["2001", "0db8"]
    for (let i = 0; i < zeroIndex; i++) {
        paddingAddress(fullIPv6Address, splitIPv6address[i]);
    }

    // padding zero bit
    // ["2001", "0db8", "0000", "0000", "0000", "0000", "0000"]
    for (let i = zeroIndex; i < zeroIndex + numberOfZeroOctet; i++) {
        paddingAddress(fullIPv6Address, paddingZero);
    }

    // padding after zero bit
    if (splitIPv6address[tailOctetIndex] !== "") {
        for (let i = zeroIndex + 1; i <= tailOctetIndex; i++) {
            paddingAddress(fullIPv6Address, splitIPv6address[i]);
        }
    }

    return fullIPv6Address;
}

function paddingZeroFrontOctet(octet: string): string {
    const paddingLength: number = 4 - octet.length;
    const padding = "0";
    if (paddingLength === 0) return "The argument is not allowed.";
    else return padding.repeat(paddingLength) + octet;
}

function paddingAddress(ipv6Address: string[], octet: string): string[] {
    if (octet.length < 4) {
        ipv6Address.push(paddingZeroFrontOctet(octet));
    } else ipv6Address.push(octet);
    return ipv6Address;
}

function getShortenIPv6Address(fullIPv6address: string[]): string[] {
    // ["2001", "0db8", "0000", "0000", "0000", "0000", "0000" "1"] => 2001:db8::1
    const isContinuousZero = false;
    const tailOctetIndex: number = fullIPv6address.length - 1;
    const shortenIPv6Address: string[] = [];

    return [];
}
