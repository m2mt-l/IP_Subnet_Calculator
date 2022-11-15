export const ipv6TypeKey: { [key: string]: string } = {
    ipAddress: "IP address",
    networkType: "Network Type",
    ipAddressRange: "IP Address Range",
    numberOfHosts: "Number of hosts",
};

export const ipv6ResultTable: string[] = [
    ipv6TypeKey.ipAddress,
    ipv6TypeKey.networkType,
    ipv6TypeKey.ipAddressRange,
    ipv6TypeKey.numberOfHosts,
];

export const defaultStringValue: { [key: string]: string } = {
    multicast: "ff00",
    linkLocal: "fe80",
    allZeroBitOctet: "0000",
    allOneBitOctet: "ffff",
    colon: ":",
};

export const defaultNumberValue: { [key: string]: number } = {
    octetLength: 4,
    maxNumberOfBits: 128,
    maxNumberOfIPv6Array: 8,
};
