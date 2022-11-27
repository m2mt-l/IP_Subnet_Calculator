import { ipv6TypeKey, defaultStringValue, defaultNumberValue } from "../data/ipv6ResultTable";
import { ipv6SubnetHash } from "../data/ipv6Subnet";
import { IPv6Address } from "../model/IPv6Address";
import { getFullIPv6Address, getShortenIPv6Address } from "./ipv6CalculatorUtil";

export function ipv6SubnetCalculator(type: string, ipv6Address: IPv6Address): string {
    const ipv6CalculatorHashmap: { [key: string]: string } = {
        [ipv6TypeKey.ipAddress]: displayIPAddress(ipv6Address),
        [ipv6TypeKey.networkType]: getNetworkType(ipv6Address),
        [ipv6TypeKey.ipAddressRange]: getIPAddressRange(ipv6Address),
        [ipv6TypeKey.numberOfHosts]: getNumberOfHosts(ipv6Address),
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

function displayIPAddress(ipv6Address: IPv6Address): string {
    const { ipAddress, subnet, isShort } = ipv6Address;
    const fullIPv6Address: string[] = getFullIPv6Address(ipAddress);
    if (isShort) {
        return getShortenIPv6Address(fullIPv6Address).join(defaultStringValue.colon) + "/" + subnet;
    } else return fullIPv6Address.join(defaultStringValue.colon) + "/" + subnet;
}

// RFC 4291 Section 2.4
function getNetworkType(ipv6Address: IPv6Address): string {
    const { ipAddress } = ipv6Address;
    const fullIPv6Address: string[] = getFullIPv6Address(ipAddress);
    const headOctet: string = fullIPv6Address[0];
    const tailOctetIndex: number = fullIPv6Address.length - 1;
    // ff00
    if (headOctet === defaultStringValue.multicast) return "Multicast";
    // fe80
    if (headOctet === defaultStringValue.linkLocal) return "Link-Local Unicast";

    // until 112 bits
    for (let i = 0; i < tailOctetIndex; i++) {
        if (fullIPv6Address[i] !== defaultStringValue.allZeroBitOctet) return "Global Unicast";
    }
    // for last 16 bits, :: or ::1
    return fullIPv6Address[tailOctetIndex] === defaultStringValue.allZeroBitOctet
        ? "Unspecified"
        : "Loopback";
}

function getIPAddressRange(ipv6Address: IPv6Address): string {
    const { ipAddress, subnet, isShort } = ipv6Address;
    const fullIPv6Address: string[] = getFullIPv6Address(ipAddress);
    const { startIPv6Address, endIPv6Address } = getStartAndEndIPv6Address(fullIPv6Address, subnet);

    if (isShort) {
        return (
            getShortenIPv6Address(startIPv6Address).join(defaultStringValue.colon) +
            " - " +
            getShortenIPv6Address(endIPv6Address).join(defaultStringValue.colon)
        );
    } else {
        return (
            startIPv6Address.join(defaultStringValue.colon) +
            " - " +
            endIPv6Address.join(defaultStringValue.colon)
        );
    }
}

function getNumberOfHosts(ipv6Address: IPv6Address): string {
    const { subnet } = ipv6Address;
    const totalBits: number = defaultNumberValue.maxNumberOfBits - parseInt(subnet, 10);
    const numberOfHosts: bigint = totalBits < 1 ? BigInt(1) : BigInt(Math.pow(2, totalBits));
    return numberOfHosts.toLocaleString();
}

/*
Operation functions
These functions are used in Calculator functions.
*/

function getStartAndEndIPv6Address(
    ipv6Address: string[],
    subnet: string,
): { [key: string]: string[] } {
    const ipAddressRange: { [key: string]: string[] } = {
        startIPv6Address: [],
        endIPv6Address: [],
    };

    /*
    ex:
    subnet 67
    2001:0db8:beef:0123:3212:0000:0000:0001
    */
    // targetIndex = 4 -> "3212"
    const targetOctetIndex: number = Math.floor(parseInt(subnet, 10) / 16);
    // hexIndexInOctet = 0 -> "3212" -> "3"
    const hexIndexInOctet: number = Math.floor(
        (parseInt(subnet, 10) % 16) / defaultNumberValue.octetLength,
    );
    // bitIndexInHexIndex = 3 -> refer to ipv6SubnetHash 3: "e"
    // /67 -> ffff:ffff:ffff:ffff:e000:0000:0000:0000
    const bitIndexInHexIndex: number = parseInt(subnet, 10) % defaultNumberValue.octetLength;

    let { startIPv6Address, endIPv6Address } = ipAddressRange;

    // 128 bit
    if (targetOctetIndex === defaultNumberValue.maxNumberOfIPv6Array) {
        startIPv6Address = ipv6Address;
        endIPv6Address = ipv6Address;
        return ipAddressRange;
    }

    for (let i = 0; i < ipv6Address.length; i++) {
        if (i < targetOctetIndex) {
            startIPv6Address.push(ipv6Address[i]);
            endIPv6Address.push(ipv6Address[i]);
        }
        // bitwise AND or OR
        else if (i === targetOctetIndex) {
            // ipv6TargeDecimal = 3 -> "3212"
            const ipv6TargeDecimal: number = parseInt(ipv6Address[i][hexIndexInOctet], 16);
            // subnetDecimalForStart = 14 -> 3: "e"
            const subnetDecimalForStart: number = parseInt(ipv6SubnetHash[bitIndexInHexIndex], 16);
            // subnetDecimalForEnd = 1 -> 15 - 14
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
            // /67 -> frontOctet = ""
            const frontOctet: string = ipv6Address[i].slice(0, hexIndexInOctet);
            // "" + "2" + "000" = "2000"
            const targetOctetForStart =
                frontOctet +
                targetBitHexForStart +
                defaultStringValue.allZeroBitOctet.slice(hexIndexInOctet + 1);
            // "" + "3" + "fff" = "3fff"
            const targetOctetForEnd =
                frontOctet +
                targetBitHexForEnd +
                defaultStringValue.allOneBitOctet.slice(hexIndexInOctet + 1);
            startIPv6Address.push(targetOctetForStart);
            endIPv6Address.push(targetOctetForEnd);
        }
        // padding 0 or 1
        else {
            startIPv6Address.push(defaultStringValue.allZeroBitOctet);
            endIPv6Address.push(defaultStringValue.allOneBitOctet);
        }
    }

    return ipAddressRange;
}
