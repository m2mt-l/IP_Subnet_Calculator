import { getCalculatedSubnet } from "../../../util/ipv4SummaryCalculator";

describe("getCalculatedSubnet", () => {
    const sameZeroBits: number[] = [5, 4];
    const sameOctet: number[] = [4, 4];
    const differentZeroBits: number[] = [0, 4];

    test("same Zero bits", () => {
        expect(getCalculatedSubnet(2, sameZeroBits)).toBe(23);
    });

    test("same octet", () => {
        expect(getCalculatedSubnet(2, sameOctet)).toBe(24);
    });

    test("different zero bits", () => {
        expect(getCalculatedSubnet(2, differentZeroBits)).toBe(21);
    });
});
