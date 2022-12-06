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

/*
getFullIPv6Address
1. Split ipv6 address string
2. Count the number of zero octets
3. If there is no zero bit, just padding zero in splitIPv6address.
4. Push octets before zero bit
5. Padding zero bits
6. Padding after zero bits
*/
export function getFullIPv6Address(ipv6Address: string): string[] {
    // 1. Split IPv6 address
    // ["2001", "db8", "", ""]
    // ["2001", "db8", "", "1"]
    const splitIPv6address: string[] = ipv6Address.split(defaultStringValue.COLON);
    const fullIPv6AddressLength: number = defaultNumberValue.MAX_NUMBER_OF_IPV6_ARRAY;
    // 2. Count the number of zero octets
    // 6 <- ["2001", "db8", "", ""]
    // 5 <- ["2001", "db8", "", "1"]
    const numberOfZeroOctet: number =
        fullIPv6AddressLength -
        splitIPv6address.filter((octet: string) => {
            return octet !== "";
        }).length;
    const tailOctetIndex: number = splitIPv6address.length - 1;
    const zeroIndex: number = splitIPv6address.indexOf("");
    const paddingZero = defaultStringValue.ZERO_FIELD;

    const fullIPv6Address: string[] = [];

    // 3. If there is no zero bit, just padding zero in splitIPv6address.
    if (zeroIndex === -1) {
        for (const ipv6 of splitIPv6address) {
            paddingAddress(fullIPv6Address, ipv6);
        }
        return fullIPv6Address;
    }

    // 4. Push octets before zero bit
    // ["2001", "0db8"]
    for (let i = 0; i < zeroIndex; i++) {
        paddingAddress(fullIPv6Address, splitIPv6address[i]);
    }

    // 5. Padding zero bits
    // ["2001", "0db8", "0000", "0000", "0000", "0000", "0000"]
    for (let i = zeroIndex; i < zeroIndex + numberOfZeroOctet; i++) {
        paddingAddress(fullIPv6Address, paddingZero);
    }

    // 6. Padding after zero bits
    if (splitIPv6address[tailOctetIndex] !== "") {
        for (let i = zeroIndex + 1; i <= tailOctetIndex; i++) {
            paddingAddress(fullIPv6Address, splitIPv6address[i]);
        }
    }

    return fullIPv6Address;
}

function paddingAddress(ipv6Address: string[], octet: string): string[] {
    // If the octet is shorter than 4, padding zero in font of the octet.
    if (octet.length < defaultNumberValue.OCTET_LENGTH) {
        ipv6Address.push(paddingZeroFrontOctet(octet));
    } else ipv6Address.push(octet);
    return ipv6Address;
}

function paddingZeroFrontOctet(octet: string): string {
    // paddingLength should be 0, 1, 2, 3
    const paddingLength: number = defaultNumberValue.OCTET_LENGTH - octet.length;
    const padding = "0";
    // Octet length 4 is not allowed.
    if (paddingLength === 0) throw new Error("The argument is not allowed.");
    else return padding.repeat(paddingLength) + octet;
}

/*
getShortenIPv6Address
Get shorten IPv6 address from full IPv6 address based on RFC5952.

4.1.  Handling Leading Zeros in a 16-Bit Field
Leading zeros MUST be suppressed.  For example, 2001:0db8::0001 is
not acceptable and must be represented as 2001:db8::1.  A single 16-
bit 0000 field MUST be represented as 0.

4.2.1.  Shorten as Much as Possible
The use of the symbol "::" MUST be used to its maximum capability.
For example, 2001:db8:0:0:0:0:2:1 must be shortened to 2001:db8::2:1.
Likewise, 2001:db8::0:1 is not acceptable, because the symbol "::"
could have been used to produce a shorter representation 2001:db8::1.

4.2.2.  Handling One 16-Bit 0 Field
The symbol "::" MUST NOT be used to shorten just one 16-bit 0 field.

4.2.3.  Choice in Placement of "::"
When there is an alternative choice in the placement of a "::", the
longest run of consecutive 16-bit 0 fields MUST be shortened (i.e.,
the sequence with three consecutive zero fields is shortened in 2001:
0:0:1:0:0:0:1).  When the length of the consecutive 16-bit 0 fields
are equal (i.e., 2001:db8:0:0:1:0:0:1), the first sequence of zero
bits MUST be shortened.  For example, 2001:db8::1:0:0:1 is correct
representation.

output:
["2001", "0db8", "0000", "0000", "0000", "0000", "0000" "0001"] => ["2001", "db8", "", "1"]
["2001", "0000", "0000", "beef", "0000", "0000", "0000", "0001"] => ["2001", "0", "0" , "beef", "", "1"]
["2001", "0000", "0000", "beef", "0001", "0000", "0000", "0001"] => ["2001", "", "beef", "1", "0", "0", "1"]
*/

export function getShortenIPv6Address(fullIPv6address: string[]): string[] {
    // Change string array to string
    const revertIPv6Address: string = fullIPv6address.join(":");

    // :: unspecified
    if (revertIPv6Address.includes(EIGHT_ZERO_FIELDS)) return ["", "", ""];

    // Suppress zero fields of revertIPv6Address
    // includes can get the first maximum consecutive zero fields.
    let replacedIPv6Address = "";
    if (revertIPv6Address.includes(SEVEN_ZERO_FIELDS))
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
    // Only one zero field is never changed
    else replacedIPv6Address = revertIPv6Address;

    // If the last replacedIPv6Address string is a colon, add one more colon.
    if (replacedIPv6Address.at(-1) === defaultStringValue.COLON)
        replacedIPv6Address += defaultStringValue.COLON;
    // console.log(replacedIPv6Address);

    // Change replacedIPv6Address to array
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

/*
getStartAndEndIPv6Address
1.Check calculated hex from subnet.
    ex:
    subnet 67
    2001:0db8:beef:0123:3212:0000:0000:0001

    targetIndex = 4 -> "3212" -> 67 / 16 = 4
    hexIndexInOctet = 0 -> "3212" -> "3" -> 67 % 16 / 4 = 0
    bitIndexInHexIndex = 3 -> 67 % 4 -> refer to ipv6SubnetHash 3: "e" ("1110")
    /67 -> ffff:ffff:ffff:ffff:e000:0000:0000:0000

2.bitwise AND or OR
Get decimal values from above Indexes.
start address: ipv6 hex AND subnet hex
end address: ipv6 hex OR subnet hex

3.Padding 0 for start address and padding 1 for end address
*/
export function getStartAndEndIPv6Address(
    ipv6Address: string[],
    subnet: string,
): { [key: string]: string[] } {
    const ipAddressRange: { [key: string]: string[] } = {
        startIPv6Address: [],
        endIPv6Address: [],
    };

    // targetIndex = 4 -> "3212" 67 / 16 = 4
    const targetOctetIndex: number = Math.floor(parseInt(subnet, 10) / 16);
    // hexIndexInOctet = 0 -> "3212" -> "3"
    const hexIndexInOctet: number = Math.floor(
        (parseInt(subnet, 10) % 16) / defaultNumberValue.OCTET_LENGTH,
    );
    // bitIndexInHexIndex = 3 -> refer to ipv6SubnetHash 3: "e"
    const bitIndexInHexIndex: number = parseInt(subnet, 10) % defaultNumberValue.OCTET_LENGTH;

    let { startIPv6Address, endIPv6Address } = ipAddressRange;

    // All 128 bits are the same
    if (targetOctetIndex === defaultNumberValue.MAX_NUMBER_OF_IPV6_ARRAY) {
        startIPv6Address = ipv6Address;
        endIPv6Address = ipv6Address;
        return ipAddressRange;
    }

    for (let i = 0; i < ipv6Address.length; i++) {
        // Push ipv6 address until targetOctetIndex
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
