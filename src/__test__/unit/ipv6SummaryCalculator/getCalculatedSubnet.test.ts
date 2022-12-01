import { getCalculatedSubnet } from "../../../util/ipv6SummaryCalculator";

describe("getCalculatedSubnet", () => {
    const sameZeroBits: string[] = ["00a4", "00a5", "00a6"];
    const differentZeroBits: string[] = ["00a0", "00a4"];
    const differentMaxZeroBits: string[] = ["0000", "00ff"];

    // export function getCalculatedSubnet(octetIndex: number, calculatedOctetArray: string[]): number {

    test("same Zero bits", () => {
        // 0100, 0101, 0110 <- ["00a4", "00a5", "00a6"]
        // 48 + 12 + 2
        expect(getCalculatedSubnet(3, sameZeroBits)).toBe(62);
    });

    test("different zero bits", () => {
        // 0000, 0100 <- ["00a0", "00a4"];
        // 32 + 12 + 1
        expect(getCalculatedSubnet(2, differentZeroBits)).toBe(45);
    });

    test("different max zero bits", () => {
        // 0000, 1111 <- ["00a0", "00af"];
        // 64 + 8
        expect(getCalculatedSubnet(4, differentMaxZeroBits)).toBe(72);
    });
});
