export function generateIpv6Slash(): string[] {
    const output = [];
    for (let i = 128; i >= 0; i--) {
        const slash = i.toString();
        output.push("/" + slash);
    }
    return output;
}

export const ipv6SubnetHash: { [key: number]: string } = {
    0: "0",
    1: "8",
    2: "c",
    3: "e",
};
// Math.ceil(subnet / 16) == Index
// subnet % 16 == bit
// 0 - 16 : 0
// 17 - 32 : 1
// 33 - 48 : 2
// 49 - 64 : 3
// 65 - 80 : 4
// 81 - 96 : 5
// 97 - 112 : 6
// 113 - 128 : 7
