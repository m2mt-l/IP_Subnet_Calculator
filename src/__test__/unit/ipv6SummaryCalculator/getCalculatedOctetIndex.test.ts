import { getCalculatedOctetIndex } from "../../../util/ipv6SummaryCalculator";

// export function getCalculatedOctetIndex(ipv6StartAddressArray: string[][]): number {

// "2001:db8:1231::"

describe("getShortestSubnet", () => {
    const firstOctetData: string[][] = [
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2002", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
    ];

    const secondOctetData: string[][] = [
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "1db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
    ];

    const thirdOctetData: string[][] = [
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1231", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
    ];

    const lastOctetData: string[][] = [
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0001"],
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
    ];

    const sameOctetData: string[][] = [
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
    ];

    test("first octet index", () => {
        expect(getCalculatedOctetIndex(firstOctetData)).toBe(0);
    });

    test("second octet index", () => {
        expect(getCalculatedOctetIndex(secondOctetData)).toBe(1);
    });

    test("third octet index", () => {
        expect(getCalculatedOctetIndex(thirdOctetData)).toBe(2);
    });

    test("last octet index", () => {
        expect(getCalculatedOctetIndex(lastOctetData)).toBe(7);
    });

    test("same octet index", () => {
        expect(getCalculatedOctetIndex(sameOctetData)).toBe(-1);
    });
});
