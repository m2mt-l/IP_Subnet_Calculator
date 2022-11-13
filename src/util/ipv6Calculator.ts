import { ipv6TypeKey } from "../data/ipv6ResultTable";

export function ipv6Calculator(type: string, ipv6Address: string, subnet: string): string {
    const ipv6CalculatorHashmap: { [key: string]: string } = {
        [ipv6TypeKey.ipAddress]: displayIPAddress(ipv6Address, subnet),
        [ipv6TypeKey.networkType]: getNetworkType(getFullIPv6Address(ipv6Address)),
        [ipv6TypeKey.ipAddressRange]: "ip address range",
        [ipv6TypeKey.numberOfHosts]: "number of hosts",
    };
    return ipv6CalculatorHashmap[type];
}

/*
Calculator functions
 -displayIPAddress
 -getNetworkType

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
    if (splitIPv6address.length === 8)
        return getShortenIPv6Address(splitIPv6address).join(":") + " /" + subnet;
    const fullIPv6Address: string[] = getFullIPv6Address(ipv6Address);

    return getShortenIPv6Address(fullIPv6Address).join(":") + " /" + subnet;
}

// RFC 4291 Section 2.4
function getNetworkType(fullIPv6Address: string[]): string {
    const headOctet: string = fullIPv6Address[0];
    const tailOctetIndex: number = fullIPv6Address.length - 1;
    if (headOctet === "ff00") return "Multicast";
    if (headOctet === "fe80") return "Link-Local Unicast";
    for (let i = 0; i < tailOctetIndex; i++) {
        if (fullIPv6Address[i] !== "0000") return "Global Unicast";
    }
    return fullIPv6Address[tailOctetIndex] === "0000" ? "Unspecified" : "Loopback";
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

// If the ipv6Address does not have zero bits, this should not be used.
function getShortenIPv6Address(fullIPv6address: string[]): string[] {
    // ["2001", "0db8", "0000", "0000", "0000", "0000", "0000" "0001"] => ["2001", "db8" "", "", "1"]
    const tailOctetIndex: number = fullIPv6address.length - 1;
    const shortenIPv6Address: string[] = [];
    const zeroBitCount: number = fullIPv6address.reduce(
        (count, octet) => (octet === "0000" ? count + 1 : count),
        0,
    );
    const zeroIndex: number = fullIPv6address.indexOf("0000");

    if (zeroBitCount === 0) {
        for (let i = 0; i <= tailOctetIndex; i++) {
            let octet = fullIPv6address[i];
            while (octet[0] === "0") {
                octet = omitFrontZero(octet);
            }
            shortenIPv6Address.push(octet);
        }
    } else if (zeroBitCount === 1) {
        for (let i = 0; i <= tailOctetIndex; i++) {
            let octet = fullIPv6address[i];
            if (octet === "0000") shortenIPv6Address.push("0");
            else {
                while (octet[0] === "0") {
                    octet = omitFrontZero(octet);
                }
                shortenIPv6Address.push(octet);
            }
        }
    } else {
        const tempIPv6Address = fullIPv6address.filter((octet) => octet !== "0000");
        for (let i = 0; i < tempIPv6Address.length; i++) {
            let octet = tempIPv6Address[i];
            while (octet[0] === "0") {
                octet = omitFrontZero(octet);
            }
            shortenIPv6Address.push(octet);
        }
        shortenIPv6Address.splice(zeroIndex, 0, "");
        if (fullIPv6address[tailOctetIndex] === "0000") shortenIPv6Address.push("");
    }
    return shortenIPv6Address;
}

function omitFrontZero(octet: string): string {
    if (octet[0] !== "0") return octet;
    else return octet.slice(1);
}
