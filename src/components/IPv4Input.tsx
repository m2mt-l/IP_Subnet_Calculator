import React, { FC, useState, ChangeEvent } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { generateIpv4Slash } from "../data/ipv4Subnet";
import { isValidIpv4Address } from "../util/ipv4AddressValidation";
import IPv4ResultTable from "./IPv4ResultTable";
import { DefaultIPv4 } from "../data/ipv4InputDefaultValue";

const IPv4Input: FC = () => {
    // Input IPv4 address state
    const [ipv4Address, setIpv4Address] = useState<string>("");

    // Select subnet state
    const [ipv4Subnet, setIpv4Subnet] = useState<string>("24"); // default value

    // If IP address is input or not
    const [isValidIpv4AddressState, setIsValidIpv4AddressState] = useState<boolean>(true);

    // If IP address is calculated or not
    const [isCalculated, setIsCalculated] = useState<boolean>(false);

    const handleIpv4AddressChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setIpv4Address(value);
        // console.log(ipv4Address);
    };

    const handleIpv4SubnetChange = (event: SelectChangeEvent): void => {
        const { value } = event.target;
        setIpv4Subnet(value);
        // console.log(value);
    };

    const handleIsValidIpv4Address = (isValidIpv4Address: boolean): void => {
        setIsValidIpv4AddressState(isValidIpv4Address);
    };

    const handleCalculateClick = (): void => {
        // console.log(isValidIpv4Address(ipv4Address));
        handleIsValidIpv4Address(isValidIpv4Address(ipv4Address));
        if (!isValidIpv4AddressState || isValidIpv4Address(ipv4Address)) setIsCalculated(true);
        else setIsCalculated(false);
        // console.log(isValidIpv4AddressState);
    };

    const subnetString = generateIpv4Slash();

    return (
        <Stack spacing={2}>
            <TextField
                id="filled-basic"
                label="IPv4 address"
                variant="filled"
                sx={{ width: 300 }}
                placeholder={DefaultIPv4.placeholder}
                onChange={handleIpv4AddressChange}
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Subnet</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Subnet"
                    defaultValue={DefaultIPv4.subnet}
                    onChange={handleIpv4SubnetChange}
                >
                    {subnetString.map((subnetString, index) => {
                        return (
                            <MenuItem
                                key={index}
                                value={32 - index} // refactor
                            >
                                {subnetString}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <Button variant="contained" onClick={handleCalculateClick}>
                Calculate
            </Button>
            {!isValidIpv4AddressState && (
                <Typography align="center" sx={{ color: "error.main" }}>
                    Invalid IP address
                </Typography>
            )}
            <Divider flexItem />
            {isCalculated && <IPv4ResultTable ipv4Address={ipv4Address} subnet={ipv4Subnet} />}
        </Stack>
    );
};

export default IPv4Input;
