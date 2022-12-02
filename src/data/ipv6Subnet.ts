export function generateIPv6Slash(): string[] {
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
