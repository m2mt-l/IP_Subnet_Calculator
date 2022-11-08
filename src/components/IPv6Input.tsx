import React, { FC, useState, ChangeEvent } from "react";

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

import { generateIpv6Slash } from "../data/ipv6Subnet";
// import { isValidIpv4Address } from "../util/ipv4AddressValidation";
// import IPv4ResultTable from "./IPv4ResultTable";
import { DefaultIPv6 } from "../data/ipv6InputDefaultValue";
// import { IPv4Address } from "../model/IPv4Address";

const IPv6Input: FC = () => {
    /*
    State
    */
    // Input IPv6 address state
    const [ipv6Address, setIpv6Address] = useState<string>("");

    // Select subnet state
    const [ipv6Subnet, setIpv6Subnet] = useState<string>(DefaultIPv6.subnet); // default value

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
                            <MenuItem
                                key={index}
                                value={128 - index} // refactor
                            >
                                {subnetString}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <Button variant="contained">Calculate</Button>
            <Divider flexItem />
        </Stack>
    );
};

export default IPv6Input;
