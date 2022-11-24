import { getNumberOfPaddingZero } from "../../../util/ipv4SummaryCalculator";

describe("getNumberOfPaddingZero", () => {
    test("get 7 zero padding", () => {
        expect(getNumberOfPaddingZero(1)).toBe(7);
    });

    test("get 6 zero padding", () => {
        expect(getNumberOfPaddingZero(3)).toBe(6);
    });

    test("get 5 zero padding", () => {
        expect(getNumberOfPaddingZero(7)).toBe(5);
    });

    test("get 4 zero padding", () => {
        expect(getNumberOfPaddingZero(15)).toBe(4);
    });

    test("get 3 zero padding", () => {
        expect(getNumberOfPaddingZero(31)).toBe(3);
    });

    test("get 2 zero padding", () => {
        expect(getNumberOfPaddingZero(63)).toBe(2);
    });

    test("get 1 zero padding", () => {
        expect(getNumberOfPaddingZero(127)).toBe(1);
    });

    test("get 0 zero padding", () => {
        expect(getNumberOfPaddingZero(128)).toBe(0);
    });
});
