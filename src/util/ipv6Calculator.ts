import { ipv6TypeKey } from "../data/ipv6ResultTable";
import { ipv6SubnetHash } from "../data/ipv6Subnet";

export function ipv6Calculator(type: string, ipv6Address: string, subnet: string): string {
    const ipv6CalculatorHashmap: { [key: string]: string } = {
        [ipv6TypeKey.ipAddress]: displayIPAddress(ipv6Address, subnet),
        [ipv6TypeKey.networkType]: getNetworkType(getFullIPv6Address(ipv6Address)),
        [ipv6TypeKey.ipAddressRange]: getIPAddressRange(ipv6Address, subnet),
        [ipv6TypeKey.numberOfHosts]: getNumberOfHosts(subnet),
    };
    return ipv6CalculatorHashmap[type];
}

/*
Calculator functions
 -displayIPAddress
 -getNetworkType
 -getIPAddressRange
 -getNumberOfHosts

These functions should be used in ipv6CalculatorHashmap.
The arguments are only ipv6Address(string) or subnet(string).
*/

// 2001:db8::
// 16bit * 8
// hex ["0000", "0000", "0000", "0000", "0000", "0000", "0000", "0000"]
// binary ["0000000000000000",....]
// 100000
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

function getIPAddressRange(ipv6Address: string, subnet: string): string {
    const fullIPv6Address: string[] = getFullIPv6Address(ipv6Address);
    const { startIPv6Address, endIPv6Address } = getStartAndEndIPv6Address(fullIPv6Address, subnet);
    return startIPv6Address.join(":") + " - " + endIPv6Address.join(":");
}

function getNumberOfHosts(subnet: string): string {
    const totalBits: number = 128 - parseInt(subnet, 10);
    const numberOfHosts: bigint = totalBits < 1 ? BigInt(1) : BigInt(Math.pow(2, totalBits));
    return numberOfHosts.toLocaleString();
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

function getStartAndEndIPv6Address(
    ipv6Address: string[],
    subnet: string,
): { [key: string]: string[] } {
    const ipAddressRange: { [key: string]: string[] } = {
        startIPv6Address: [],
        endIPv6Address: [],
    };

    /* ex: subnet 67
           2001:0db8:beef:0123:3212:0000:0000:0001
    */
    // 4 -> "3212"
    const targetOctetIndex: number = Math.floor(parseInt(subnet, 10) / 16);
    // 0 -> "3212" -> "3"
    const hexIndexInOctet: number = Math.floor((parseInt(subnet, 10) % 16) / 4);
    // /67 -> ffff:ffff:ffff:ffff:e000:0000:0000:0000
    // 3 -> refer to ipv6SubnetHash 3: "e"
    const bitIndexInHexIndex: number = parseInt(subnet, 10) % 4;

    let { startIPv6Address, endIPv6Address } = ipAddressRange;

    // 128 bit
    if (targetOctetIndex === 8) {
        startIPv6Address = ipv6Address;
        endIPv6Address = ipv6Address;
        return ipAddressRange;
    }

    let targetOctetForStart = "0000";
    let targetOctetForEnd = "ffff";
    for (let i = 0; i < ipv6Address.length; i++) {
        if (i < targetOctetIndex) {
            startIPv6Address.push(ipv6Address[i]);
            endIPv6Address.push(ipv6Address[i]);
        }
        // bitwise AND or OR
        else if (i === targetOctetIndex) {
            // 3 -> "3212"
            const ipv6TargeDecimal: number = parseInt(ipv6Address[i][hexIndexInOctet], 16);
            // 14 -> 3: "e"
            const subnetDecimalForStart: number = parseInt(ipv6SubnetHash[bitIndexInHexIndex], 16);
            // 1
            const subnetDecimalForEnd: number =
                15 - parseInt(ipv6SubnetHash[bitIndexInHexIndex], 16);
            // bitwise AND for start
            const targetBitHexForStart: string = (
                ipv6TargeDecimal & subnetDecimalForStart
            ).toString(16);
            // bitwise OR for end
            const targetBitHexForEnd: string = (ipv6TargeDecimal | subnetDecimalForEnd).toString(
                16,
            );
            // frontOctet with unchanged bits
            const frontOctet: string = ipv6Address[i].slice(0, hexIndexInOctet);
            targetOctetForStart =
                frontOctet + targetBitHexForStart + targetOctetForStart.slice(hexIndexInOctet + 1);
            targetOctetForEnd =
                frontOctet + targetBitHexForEnd + targetOctetForEnd.slice(hexIndexInOctet + 1);
            startIPv6Address.push(targetOctetForStart);
            endIPv6Address.push(targetOctetForEnd);
        }
        // padding 0 or 1
        else {
            startIPv6Address.push("0000");
            endIPv6Address.push("ffff");
        }
    }

    return ipAddressRange;
}

// Math.ceil(subnet / 16) == Index
// subnet % 16 == bit
// 0 - 16 : 0
// 17 - 32 : 1
// 33 - 48 : 2
// 49 - 64 : 3
// 65 - 80 : 4
// 81 - 96 : 5
// 97 - 112 : 6
// 113 - 127 : 7
