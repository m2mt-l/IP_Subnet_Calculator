import {
    getCalculatedOctetArray,
    getCalculatedOctetIndex,
} from "../../../util/ipv6SummaryCalculator";

describe("getCalculatedOctetArray", () => {
    const firstOctetTestData: string[][] = [
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2002", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
    ];
    const firstOctetIndex: number = getCalculatedOctetIndex(firstOctetTestData);

    const firstOctetOutput: string[] = ["2001", "2002", "2001", "2001"];

    const thirdOctetTestData: string[][] = [
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1231", "0000", "0000", "0000", "0000", "0000"],
        ["2001", "0db8", "1234", "0000", "0000", "0000", "0000", "0000"],
    ];

    const thirdOctetIndex: number = getCalculatedOctetIndex(thirdOctetTestData);

    const thirdOctetOutput: string[] = ["1234", "1234", "1231", "1234"];

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
