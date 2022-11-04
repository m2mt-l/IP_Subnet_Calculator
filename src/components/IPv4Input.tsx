import React, { FC } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { generateIpv4Slash } from "../data/ipv4Subnet";

const IPv4Input: FC = () => {
    const subnetString = generateIpv4Slash();
    return (
        <Stack spacing={2}>
            <TextField
                id="filled-basic"
                label="IPv4 address"
                variant="filled"
                sx={{ width: 300 }}
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Subnet</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
                    {subnetString.map((subnetString, index) => {
                        return (
                            <MenuItem key={index} value={32 - index}>
                                {subnetString}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <Button variant="contained">Calculate</Button>
        </Stack>
    );
};

export default IPv4Input;
