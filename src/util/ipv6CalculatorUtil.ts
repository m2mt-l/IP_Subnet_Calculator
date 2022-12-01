import { defaultStringValue, defaultNumberValue } from "../data/ipv6ResultTable";
import { ipv6SubnetHash } from "../data/ipv6Subnet";

export function getFullIPv6Address(ipv6Address: string): string[] {
    // ["2001", "db8", "", ""]
    // ["2001", "db8", "", "1"]
    const splitIPv6address: string[] = ipv6Address.split(defaultStringValue.colon);
    const fullIPv6AddressLength: number = defaultNumberValue.maxNumberOfIPv6Array;
    // 6
    // 5
    const numberOfZeroOctet: number =
        fullIPv6AddressLength -
        splitIPv6address.filter((octet: string) => {
            return octet !== "";
        }).length;
    const tailOctetIndex: number = splitIPv6address.length - 1;
    const zeroIndex: number = splitIPv6address.indexOf("");
    const paddingZero = defaultStringValue.allZeroBitOctet;

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

function paddingAddress(ipv6Address: string[], octet: string): string[] {
    if (octet.length < defaultNumberValue.octetLength) {
        ipv6Address.push(paddingZeroFrontOctet(octet));
    } else ipv6Address.push(octet);
    return ipv6Address;
}

function paddingZeroFrontOctet(octet: string): string {
    const paddingLength: number = defaultNumberValue.octetLength - octet.length;
    const padding = "0";
    if (paddingLength === 0) return "The argument is not allowed.";
    else return padding.repeat(paddingLength) + octet;
}

// get shorten IPv6 address from full IPv6 address
export function getShortenIPv6Address(fullIPv6address: string[]): string[] {
    // ["2001", "0db8", "0000", "0000", "0000", "0000", "0000" "0001"] => ["2001", "db8" "", "", "1"]
    // "::" -> ["","",""]
    const tailOctetIndex: number = fullIPv6address.length - 1;
    const shortenIPv6Address: string[] = [];
    // count 16 bit 0 field("0000")
    const zeroBitCount: number = fullIPv6address.reduce(
        (count, octet) => (octet === defaultStringValue.allZeroBitOctet ? count + 1 : count),
        0,
    );
    const zeroIndex: number = fullIPv6address.indexOf(defaultStringValue.allZeroBitOctet);

    if (zeroBitCount === 0) {
        // If there is no 0 field, just omit front zero.
        for (let i = 0; i <= tailOctetIndex; i++) {
            const octet: string = omitFrontZeroFromOctet(fullIPv6address[i]);
            shortenIPv6Address.push(octet);
        }
    } else if (zeroBitCount === 1) {
        // If only one 0 field, use 0 not ""(::) -> RFC5952 4.2.2
        for (let i = 0; i <= tailOctetIndex; i++) {
            if (fullIPv6address[i] === defaultStringValue.allZeroBitOctet)
                shortenIPv6Address.push("0");
            else {
                const octet: string = omitFrontZeroFromOctet(fullIPv6address[i]);
                shortenIPv6Address.push(octet);
            }
        }
    } else if (zeroBitCount === 8) {
        // for unspecified
        return ["", "", ""];
    } else {
        // filter 0 field
        const tempIPv6Address = fullIPv6address.filter(
            (octet) => octet !== defaultStringValue.allZeroBitOctet,
        );
        for (let i = 0; i < tempIPv6Address.length; i++) {
            const octet = omitFrontZeroFromOctet(tempIPv6Address[i]);
            shortenIPv6Address.push(octet);
        }
        shortenIPv6Address.splice(zeroIndex, 0, "");
        if (fullIPv6address[tailOctetIndex] === defaultStringValue.allZeroBitOctet)
            shortenIPv6Address.push("");
    }
    return shortenIPv6Address;
}

function omitFrontZeroFromOctet(octet: string): string {
    while (octet[0] === "0") {
        octet = octet.slice(1);
    }
    return octet;
}

export function getStartAndEndIPv6Address(
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
