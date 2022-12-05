export const ipv4TypeKey: { [key: string]: string } = {
    ipAddress: "IP Address",
    networkAddress: "Network Address",
    hostAddressRange: "Host Address Range",
    numberOfHosts: "Number of Hosts",
    broadcastAddress: "Broadcast Address",
    subnetMask: "Subnet Mask",
    ipType: "IP Type",
    networkClass: "Network Class",
    ipv4Mapped: "IPv4 Mapped Address",
    sixToFour: "6to4 Prefix",
};

export const ipv4ResultTable: string[] = [
    ipv4TypeKey.ipAddress,
    ipv4TypeKey.networkAddress,
    ipv4TypeKey.hostAddressRange,
    ipv4TypeKey.numberOfHosts,
    ipv4TypeKey.broadcastAddress,
    ipv4TypeKey.subnetMask,
    ipv4TypeKey.ipType,
    ipv4TypeKey.networkClass,
    ipv4TypeKey.ipv4Mapped,
    ipv4TypeKey.sixToFour,
];
