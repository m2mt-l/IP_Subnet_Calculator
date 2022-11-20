import React, { FC, useState, ChangeEvent, memo } from "react";

// Material UI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { generateIpv6Slash, shortOrLong } from "../data/ipv6Subnet";
import { isValidIpv6Address } from "../util/ipv6AddressValidation";
import IPv6ResultTable from "./IPv6ResultTable";
import { DefaultIPv6 } from "../data/ipv6SubnetDefaultValue";
import { IPv6Address } from "../model/IPv6Address";
import { getIPv6SubnetValue } from "../util/ipv6Subnet";

const IPv6Subnet: FC = memo(function IPv6SubnetComponent() {
    /*
    State
    */
    // Input IPv6 address state
    const [ipv6Address, setIpv6Address] = useState<string>("");

    // Select subnet state
    const [ipv6Subnet, setIpv6Subnet] = useState<string>(DefaultIPv6.subnet); // default value

    // If IP address is input or not
    const [isValidIpv6AddressState, setIsValidIpv6AddressState] = useState<boolean>(true);

    // If IP address is calculated or not
    const [isCalculated, setIsCalculated] = useState<boolean>(false);

    // Deep copied state for IPv6ResultTable
    const [addressAndSubnet, setAddressAndSubnet] = useState<IPv6Address>({
        ipAddress: "",
        subnet: "",
        isShort: true,
    });

    // Text Representation is short or not
    const [isShort, setIsShort] = useState<boolean>(true);

    /*
    Handle method for state
    */
    const handleIpv6AddressChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setIpv6Address(value);
        // console.log(ipv6Address);
    };

    const handleIpv6SubnetChange = (event: SelectChangeEvent): void => {
        const { value } = event.target;
        setIpv6Subnet(value);
        // console.log(value);
    };

    const handleIsValidIpv6Address = (isValidIpv6Address: boolean): void => {
        setIsValidIpv6AddressState(isValidIpv6Address);
    };

    const handleIsShort = (event: SelectChangeEvent): void => {
        const { value } = event.target;
        // console.log(value);
        if (value === "short") setIsShort(true);
        else setIsShort(false);
    };

    const handleCalculateClick = (): void => {
        // console.log(isValidIpv4Address(ipv4Address));
        handleIsValidIpv6Address(isValidIpv6Address(ipv6Address));
        if (isValidIpv6Address(ipv6Address)) setIsCalculated(true);
        else setIsCalculated(false);
        handleAddressAndSubnet();
    };

    const handleAddressAndSubnet = (): void => {
        setAddressAndSubnet({
            ipAddress: ipv6Address,
            subnet: ipv6Subnet,
            isShort: isShort,
        });
    };

    const subnetString = generateIpv6Slash();

    return (
        <Stack spacing={2}>
            <TextField
                id="filled-basic"
                label="IPv6 address"
                variant="filled"
                sx={{ minWidth: 370 }}
                placeholder={DefaultIPv6.placeholder}
                onChange={handleIpv6AddressChange}
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Subnet</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Subnet"
                    defaultValue={DefaultIPv6.subnet}
                    onChange={handleIpv6SubnetChange}
                >
                    {subnetString.map((subnetString, index) => {
                        return (
                            <MenuItem key={index} value={getIPv6SubnetValue(index)}>
                                {subnetString}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Representation</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Representation"
                    defaultValue={DefaultIPv6.representation}
                    onChange={handleIsShort}
                >
                    {shortOrLong.map((shortOrLong, index) => {
                        return (
                            <MenuItem key={index} value={shortOrLong}>
                                {shortOrLong}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <Button variant="contained" onClick={handleCalculateClick}>
                {DefaultIPv6.calculate}
            </Button>
            {!isValidIpv6AddressState && (
                <Typography align="center" sx={{ color: "error.main" }}>
                    {DefaultIPv6.validationError}
                </Typography>
            )}
            <Divider flexItem />
            {isCalculated && <IPv6ResultTable {...addressAndSubnet} />}
        </Stack>
    );
});

export default IPv6Subnet;