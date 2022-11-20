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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";

import { generateIPv4Slash } from "../data/ipv4Subnet";
import { isValidIpv4Address } from "../util/ipv4AddressValidation";
import IPv4ResultTable from "./IPv4ResultTable";
import InputIPv4AddressForSummary from "./uiParts/InputIPv4AddressForSummary";
import { DefaultIPv4 } from "../data/ipv4SubnetDefaultValue";
import { IPv4Address } from "../model/IPv4Address";

const IPv4Summary: FC = () => {
    const subnetString = generateIPv4Slash();

    return (
        <Stack spacing={2}>
            <Stack
                direction={"row"}
                component="form"
                spacing={2}
                sx={{
                    "& .MuiTextField-root": { m: 3, width: "25ch" },
                    maxWidth: 500,
                }}
                autoComplete="off"
                justifyContent="center"
                alignItems="center"
            >
                <InputIPv4AddressForSummary />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Subnet</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="select-subnet"
                        data-testid="subnet"
                        label="Subnet"
                        defaultValue={DefaultIPv4.subnet}
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
            </Stack>
            <Stack direction={"row"} spacing={5} justifyContent="center" alignItems="center">
                <IconButton>
                    <RemoveIcon />
                </IconButton>
                <IconButton>
                    <AddIcon />
                </IconButton>
            </Stack>
            <Button variant="contained">Calculate</Button>
            <Divider flexItem />
        </Stack>
    );
};

export default IPv4Summary;
