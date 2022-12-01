import { getStartAndEndIPv6Address } from "../../util/ipv6CalculatorUtil";

describe("getStartAndEndIPv6Address", () => {
    /*
    ex:
    subnet 67
    2001:0db8:beef:0123:3212:0000:0000:0001
    ->2001:0db8:beef:0123:2000:0000:0000:0000 - 2001:0db8:beef:0123:3fff:ffff:ffff:ffff
    */

    const standardAddress: string[] = [
        "2001",
        "0db8",
        "beef",
        "0123",
        "3212",
        "0000",
        "0000",
        "0001",
    ];

    const standardSubnet: string = "67";

    const standardOutput: { [key: string]: string[] } = {
        startIPv6Address: ["2001", "0db8", "beef", "0123", "2000", "0000", "0000", "0000"],
        endIPv6Address: ["2001", "0db8", "beef", "0123", "3fff", "ffff", "ffff", "ffff"],
    };

    test("standard", () => {
        expect(getStartAndEndIPv6Address(standardAddress, standardSubnet)).toEqual(standardOutput);
    });
});
