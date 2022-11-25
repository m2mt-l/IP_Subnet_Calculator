import { getCalculatedOctetIndex } from "../../../util/ipv4SummaryCalculator";

describe("getCalculatedOctetIndex", () => {
    const firstOctetData: number[][] = [
        [10, 2, 0, 0],
        [11, 2, 0, 0],
        [10, 2, 0, 0],
        [10, 2, 0, 0],
    ];

    const secondOctetData: number[][] = [
        [10, 2, 0, 0],
        [10, 2, 0, 0],
        [10, 3, 0, 0],
        [10, 2, 0, 0],
    ];

    const thirdOctetData: number[][] = [
        [10, 2, 0, 0],
        [10, 2, 1, 0],
        [10, 2, 0, 0],
        [10, 2, 0, 0],
    ];

    const fourthOctetData: number[][] = [
        [10, 2, 0, 0],
        [10, 2, 0, 1],
        [10, 2, 0, 2],
        [10, 2, 0, 3],
    ];

    const sameAllOctetsData: number[][] = [
        [10, 2, 0, 1],
        [10, 2, 0, 1],
        [10, 2, 0, 1],
        [10, 2, 0, 1],
    ];

    test("get first octet", () => {
        expect(getCalculatedOctetIndex(firstOctetData)).toBe(0);
    });

    test("get second octet", () => {
        expect(getCalculatedOctetIndex(secondOctetData)).toBe(1);
    });

    test("get third octet", () => {
        expect(getCalculatedOctetIndex(thirdOctetData)).toBe(2);
    });

    test("get fourth octet", () => {
        expect(getCalculatedOctetIndex(fourthOctetData)).toBe(3);
    });

    test("get the same", () => {
        expect(getCalculatedOctetIndex(sameAllOctetsData)).toBe(-1);
    });
});
