import React, { FC } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const IPv4Input: FC = () => {
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
                    <MenuItem value={10}>32</MenuItem>
                    <MenuItem value={20}>31</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained">Calculate</Button>
        </Stack>
    );
};

export default IPv4Input;
