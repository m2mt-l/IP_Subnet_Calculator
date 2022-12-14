// Material UI
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { FC, useState, ChangeEvent, memo } from "react";

import { generateIPv4Slash } from "../../data/ipv4Subnet";
import { DefaultIPv4 } from "../../data/ipv4SubnetDefaultValue";
import { IPv4Address } from "../../model/IPv4Address";
import { isValidIpv4Address } from "../../util/ipv4AddressValidation";
import { getIPv4SubnetValue } from "../../util/ipv4SubnetUtil";
import IPv4ResultTable from "./IPv4ResultTable";

const IPv4Subnet: FC = memo(function ipv4SubnetComponent() {
    /*
    State
    */
    // Input IPv4 address state
    const [ipv4Address, setIPv4Address] = useState<string>("");

    // Select subnet state
    const [ipv4Subnet, setIPv4Subnet] = useState<string>(DefaultIPv4.SUBNET); // default value

    // If IP address is input or not
    const [isValidIPv4AddressState, setIsValidIPv4AddressState] = useState<boolean>(true);

    // If IP address is calculated or not
    const [isCalculated, setIsCalculated] = useState<boolean>(false);

    // Deep copied state for IPv4ResultTable
    const [addressAndSubnet, setAddressAndSubnet] = useState<IPv4Address>({
        ipAddress: "",
        subnet: "",
    });

    /*
    Handle method for state
    */
    const handleIPv4AddressChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setIPv4Address(value);
        // console.log(ipv4Address);
    };

    const handleIPv4SubnetChange = (event: SelectChangeEvent): void => {
        const { value } = event.target;
        setIPv4Subnet(value);
        // console.log(value);
    };

    const handleIsValidIPv4Address = (isValidIpv4Address: boolean): void => {
        setIsValidIPv4AddressState(isValidIpv4Address);
    };

    const handleCalculateClick = (): void => {
        // console.log(isValidIpv4Address(ipv4Address));
        handleIsValidIPv4Address(isValidIpv4Address(ipv4Address));
        if (isValidIpv4Address(ipv4Address)) setIsCalculated(true);
        else setIsCalculated(false);
        handleAddressAndSubnet();
        // console.log(isValidIpv4AddressState);
    };

    const handleAddressAndSubnet = (): void => {
        setAddressAndSubnet({
            ipAddress: ipv4Address,
            subnet: ipv4Subnet,
        });
    };

    const subnetString = generateIPv4Slash();

    return (
        <Stack spacing={2}>
            <TextField
                id="filled-basic"
                label="IPv4 address"
                variant="filled"
                sx={{ minWidth: 370 }}
                placeholder={DefaultIPv4.PLACEHOLDER}
                onChange={handleIPv4AddressChange}
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Subnet</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="select-subnet"
                    data-testid="subnet"
                    label="Subnet"
                    defaultValue={DefaultIPv4.SUBNET}
                    onChange={handleIPv4SubnetChange}
                >
                    {subnetString.map((subnetString, index) => {
                        return (
                            <MenuItem key={index} value={getIPv4SubnetValue(index)}>
                                {subnetString}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <Button variant="contained" onClick={handleCalculateClick} data-testid="calculate">
                {DefaultIPv4.CALCULATE}
            </Button>
            {!isValidIPv4AddressState && (
                <Typography align="center" sx={{ color: "error.main" }}>
                    {DefaultIPv4.VALIDATION_ERROR}
                </Typography>
            )}
            <Divider flexItem />
            {isCalculated && <IPv4ResultTable {...addressAndSubnet} />}
        </Stack>
    );
});

export default IPv4Subnet;
