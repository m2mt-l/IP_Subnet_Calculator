import {
    getCalculatedOctetArray,
    getCalculatedOctetIndex,
} from "../../../util/ipv4SummaryCalculator";

describe("getCalculatedOctetArray", () => {
    const firstOctetTestData: number[][] = [
        [1, 2, 0, 0],
        [2, 2, 1, 0],
        [3, 2, 2, 0],
        [4, 2, 3, 0],
    ];

    const firstOctetIndex: number = getCalculatedOctetIndex(firstOctetTestData);

    const firstOctetOutput: number[] = [1, 2, 3, 4];

    const thirdOctetTestData: number[][] = [
        [10, 2, 0, 0],
        [10, 2, 1, 0],
        [10, 2, 2, 0],
        [10, 2, 3, 0],
    ];

    const thirdOctetIndex: number = getCalculatedOctetIndex(thirdOctetTestData);

    const thirdOctetOutput: number[] = [0, 1, 2, 3];

    test("test first octet", () => {
        expect(getCalculatedOctetArray(firstOctetTestData, firstOctetIndex)).toEqual(
            firstOctetOutput,
        );
    });

    test("test third octet", () => {
        expect(getCalculatedOctetArray(thirdOctetTestData, thirdOctetIndex)).toEqual(
            thirdOctetOutput,
        );
    });
});
