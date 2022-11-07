export function generateIpv6Slash(): string[] {
    const output = [];
    for (let i = 128; i >= 0; i--) {
        const slash = i.toString();
        output.push("/" + slash);
    }
    return output;
}
