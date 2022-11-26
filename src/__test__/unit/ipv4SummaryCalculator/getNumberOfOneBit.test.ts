import { getNumberOfOneBit } from "../../../util/ipv4SummaryCalculator";

describe("getNumberOfOneBit", () => {
    test("get 7 one bits", () => {
        expect(getNumberOfOneBit(0, 1)).toBe(7);
    });

    test("get 6 one bits", () => {
        expect(getNumberOfOneBit(0, 3)).toBe(6);
    });

    test("get 5 one bits", () => {
        expect(getNumberOfOneBit(0, 7)).toBe(5);
    });
    test("get 4 one bits", () => {
        expect(getNumberOfOneBit(0, 15)).toBe(4);
    });
    test("get 3 one bits", () => {
        expect(getNumberOfOneBit(0, 31)).toBe(3);
    });
    test("get 2 one bits", () => {
        expect(getNumberOfOneBit(0, 63)).toBe(2);
    });
    test("get 1 one bits", () => {
        expect(getNumberOfOneBit(0, 127)).toBe(1);
    });
    test("get 0 one bits", () => {
        expect(getNumberOfOneBit(0, 128)).toBe(0);
    });
});
