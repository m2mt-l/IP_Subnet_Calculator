import React, { FC, useState, ChangeEvent } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { generateIpv4Slash } from "../data/ipv4Subnet";

const IPv4Input: FC = () => {
    const [ipv4Address, setIpv4Address] = useState<string>("");

    const handleIpv4AddressChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setIpv4Address(value);
        // console.log(ipv4Address);
    };

    const subnetString = generateIpv4Slash();

    return (
        <Stack spacing={2}>
            <TextField
                id="filled-basic"
                label="IPv4 address"
                variant="filled"
                sx={{ width: 300 }}
                placeholder="192.0.2.1" // refactor
                onChange={handleIpv4AddressChange}
            />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Subnet</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    defaultValue="24" // refactor
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
            <Button variant="contained">Calculate</Button>
        </Stack>
    );
};

export default IPv4Input;
