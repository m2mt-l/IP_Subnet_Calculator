import { defaultStringValue, defaultNumberValue } from "../data/ipv6ResultTable";
import { ipv6SubnetHash } from "../data/ipv6Subnet";
import {
    ZERO_FIELD,
    TWO_ZERO_FIELDS,
    THREE_ZERO_FIELDS,
    FOUR_ZERO_FIELDS,
    FIVE_ZERO_FIELDS,
    SIX_ZERO_FIELDS,
    SEVEN_ZERO_FIELDS,
    EIGHT_ZERO_FIELDS,
} from "../data/ipv6SummaryDefaultValue";

export function getFullIPv6Address(ipv6Address: string): string[] {
    // ["2001", "db8", "", ""]
    // ["2001", "db8", "", "1"]
    const splitIPv6address: string[] = ipv6Address.split(defaultStringValue.COLON);
    const fullIPv6AddressLength: number = defaultNumberValue.MAX_NUMBER_OF_IPV6_ARRAY;
    // 6
    // 5
    const numberOfZeroOctet: number =
        fullIPv6AddressLength -
        splitIPv6address.filter((octet: string) => {
            return octet !== "";
        }).length;
    const tailOctetIndex: number = splitIPv6address.length - 1;
    const zeroIndex: number = splitIPv6address.indexOf("");
    const paddingZero = defaultStringValue.ZERO_FIELD;

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
    if (octet.length < defaultNumberValue.OCTET_LENGTH) {
        ipv6Address.push(paddingZeroFrontOctet(octet));
    } else ipv6Address.push(octet);
    return ipv6Address;
}

function paddingZeroFrontOctet(octet: string): string {
    const paddingLength: number = defaultNumberValue.OCTET_LENGTH - octet.length;
    const padding = "0";
    if (paddingLength === 0) return "The argument is not allowed.";
    else return padding.repeat(paddingLength) + octet;
}

// RFC5952: get shorten IPv6 address from full IPv6 address
export function getShortenIPv6Address(fullIPv6address: string[]): string[] {
    // ["2001", "0db8", "0000", "0000", "0000", "0000", "0000" "0001"] => ["2001", "db8", "", "1"]
    // ["2001", "0000", "0000", "beef", "0000", "0000", "0000", "0001"] => ["2001", "0", "0" , "beef", "", "1"]
    // ["2001", "0000", "0000", "beef", "0001", "0000", "0000", "0001"] => ["2001", "", "beef", "1", "0", "0", "1"]
    // "::" -> ["","",""]

    // ["2001", "0000", "0000", "beef", "0000", "0000", "0000", "0001"] => "2001:0000:0000:beef:0000:0000:0000:0001"
    const revertIPv6Address: string = fullIPv6address.join(":");

    let replacedIPv6Address = "";
    // :: unspecified
    if (revertIPv6Address.includes(EIGHT_ZERO_FIELDS)) return ["", "", ""];
    else if (revertIPv6Address.includes(SEVEN_ZERO_FIELDS))
        replacedIPv6Address = revertIPv6Address.replace(SEVEN_ZERO_FIELDS, "");
    else if (revertIPv6Address.includes(SIX_ZERO_FIELDS))
        replacedIPv6Address = revertIPv6Address.replace(SIX_ZERO_FIELDS, "");
    else if (revertIPv6Address.includes(FIVE_ZERO_FIELDS))
        replacedIPv6Address = revertIPv6Address.replace(FIVE_ZERO_FIELDS, "");
    else if (revertIPv6Address.includes(FOUR_ZERO_FIELDS))
        replacedIPv6Address = revertIPv6Address.replace(FOUR_ZERO_FIELDS, "");
    else if (revertIPv6Address.includes(THREE_ZERO_FIELDS))
        replacedIPv6Address = revertIPv6Address.replace(THREE_ZERO_FIELDS, "");
    else if (revertIPv6Address.includes(TWO_ZERO_FIELDS))
        replacedIPv6Address = revertIPv6Address.replace(TWO_ZERO_FIELDS, "");
    else replacedIPv6Address = revertIPv6Address;

    if (replacedIPv6Address.at(-1) === ":") replacedIPv6Address += ":";
    // console.log(replacedIPv6Address);

    // "2001::beef:0001:0000:0000:0001" -> ["2001","","beef","1","0","0","1"]
    const shortenIPv6Address: string[] = replacedIPv6Address
        .split(":")
        .map((octet) => (octet === ZERO_FIELD ? "0" : omitFrontZeroFromOctet(octet)));
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
        (parseInt(subnet, 10) % 16) / defaultNumberValue.OCTET_LENGTH,
    );
    // bitIndexInHexIndex = 3 -> refer to ipv6SubnetHash 3: "e"
    // /67 -> ffff:ffff:ffff:ffff:e000:0000:0000:0000
    const bitIndexInHexIndex: number = parseInt(subnet, 10) % defaultNumberValue.OCTET_LENGTH;

    let { startIPv6Address, endIPv6Address } = ipAddressRange;

    // 128 bit
    if (targetOctetIndex === defaultNumberValue.MAX_NUMBER_OF_IPV6_ARRAY) {
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
                defaultStringValue.ZERO_FIELD.slice(hexIndexInOctet + 1);
            // "" + "3" + "fff" = "3fff"
            const targetOctetForEnd =
                frontOctet +
                targetBitHexForEnd +
                defaultStringValue.ALL_ONE_BIT_FIELD.slice(hexIndexInOctet + 1);
            startIPv6Address.push(targetOctetForStart);
            endIPv6Address.push(targetOctetForEnd);
        }
        // padding 0 or 1
        else {
            startIPv6Address.push(defaultStringValue.ZERO_FIELD);
            endIPv6Address.push(defaultStringValue.ALL_ONE_BIT_FIELD);
        }
    }

    return ipAddressRange;
}
