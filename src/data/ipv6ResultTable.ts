export const ipv6TypeKey: { [key: string]: string } = {
    ipAddress: "IP Address",
    networkType: "Network Type",
    ipAddressRange: "IP Address Range",
    numberOfHosts: "Number of Hosts",
};

export const ipv6ResultTable: string[] = [
    ipv6TypeKey.ipAddress,
    ipv6TypeKey.networkType,
    ipv6TypeKey.ipAddressRange,
    ipv6TypeKey.numberOfHosts,
];

export const defaultStringValue: { [key: string]: string } = {
    MULTICAST: "ff00",
    LINK_LOCAL: "fe80",
    ZERO_FIELD: "0000",
    ALL_ONE_BIT_FIELD: "ffff",
    COLON: ":",
};

export const defaultNumberValue: { [key: string]: number } = {
    OCTET_LENGTH: 4,
    MAX_NUMBER_OF_BITS: 128,
    MAX_NUMBER_OF_IPV6_ARRAY: 8,
};
