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
    const splitIPv6address: string[] = ipv6Address.split(":");
    const tailOctetIndex: number = splitIPv6address.length - 1;
    const fullIPv6Address: string[] = [];
    // If tailOctet is ""(0), chase from head
    if (splitIPv6address[tailOctetIndex] === "") {
        for (let i = 0; i <= tailOctetIndex; i++) {
            const octet = splitIPv6address[i];
            // If octet length is less than 4, padding zero bits
            if (octet.length < 4) {
                fullIPv6Address.push(paddingZero(octet));
            } else fullIPv6Address.push(octet);
        }
    }
    // If tailOctet is not ""(0), chase from tail
    else {
        for (let i = tailOctetIndex; i >= 0; i--) {
            const octet = splitIPv6address[i];
            if (octet.length < 4) {
                fullIPv6Address.unshift(paddingZero(octet));
            } else fullIPv6Address.unshift(octet);
        }
    }

    return fullIPv6Address;
}

function paddingZero(octet: string): string {
    const paddingLength: number = 4 - octet.length;
    const padding = "0";
    if (paddingLength === 0) return "The argument is not allowed.";
    else return padding.repeat(paddingLength) + octet;
}
