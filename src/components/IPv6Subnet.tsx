// Material UI
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import React, { FC, useState, ChangeEvent, memo, MouseEvent } from "react";

import { generateIPv6Slash } from "../data/ipv6Subnet";
import { DefaultIPv6 } from "../data/ipv6SubnetDefaultValue";
import { IPv6Address } from "../model/IPv6Address";
import { isValidIpv6Address } from "../util/ipv6AddressValidation";
import { getIPv6SubnetValue } from "../util/ipv6Subnet";
import IPv6ResultTable from "./IPv6ResultTable";

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

    const [alignment, setAlignment] = useState("short");

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

    const handleShortLongToggle = (event: MouseEvent, newAlignment: string): void => {
        // console.log(newAlignment);
        if (newAlignment !== null) setAlignment(newAlignment);
        if (newAlignment === "short") setIsShort(true);
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
            isShort,
        });
    };

    const subnetString = generateIPv6Slash();

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
            <ToggleButtonGroup
                fullWidth
                color="primary"
                value={alignment}
                exclusive
                onChange={handleShortLongToggle}
                aria-label="Platform"
            >
                <ToggleButton value="short">short</ToggleButton>
                <ToggleButton value="long">long</ToggleButton>
            </ToggleButtonGroup>

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
