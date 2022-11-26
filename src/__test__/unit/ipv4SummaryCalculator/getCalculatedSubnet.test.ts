import { getCalculatedSubnet } from "../../../util/ipv4SummaryCalculator";

describe("getCalculatedSubnet", () => {
    test("get subnet /1", () => {
        expect(getCalculatedSubnet(0, 1)).toBe(1);
    });

    test("get subnet /7", () => {
        expect(getCalculatedSubnet(0, 7)).toBe(7);
    });

    test("get subnet /8", () => {
        expect(getCalculatedSubnet(1, 0)).toBe(8);
    });

    test("get subnet /16", () => {
        expect(getCalculatedSubnet(2, 0)).toBe(16);
    });

    test("get subnet /24", () => {
        expect(getCalculatedSubnet(3, 0)).toBe(24);
    });

    test("get subnet /28", () => {
        expect(getCalculatedSubnet(3, 4)).toBe(28);
    });
});
