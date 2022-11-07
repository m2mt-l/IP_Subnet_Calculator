import React, { FC } from "react";

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
    const subnetString = generateIpv6Slash();

    return (
        <Stack spacing={2}>
            <TextField
                id="filled-basic"
                label="IPv6 address"
                variant="filled"
                sx={{ minWidth: 370 }}
                placeholder={DefaultIPv6.placeholder}
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Subnet</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Subnet"
                    defaultValue={DefaultIPv6.subnet}
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
