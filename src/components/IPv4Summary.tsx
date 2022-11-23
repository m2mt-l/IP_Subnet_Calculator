import React, { FC, useState, ChangeEvent, useContext, memo } from "react";

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
import { DefaultIPv4 } from "../data/ipv4SubnetDefaultValue";
import { IPv4Address } from "../model/IPv4Address";
import CalculateButton from "./uiParts/CalculateButton";
import AddAddressAndSubnetIcon from "./uiParts/AddAddressAndSubnetIcon";
import RemoveAddressAndSubnetIcon from "./uiParts/RemoveAddressAndSubnetIcon";
import { useAppContext } from "../contexts/AppContext";
import { getIPv4SubnetValue } from "../util/ipv4Subnet";

const IPv4Summary: FC = memo(function ipv4Summary() {
    const subnetString = generateIPv4Slash();
    const { addressAndSubnetForSummary, setAddressAndSubnetForSummary } = useAppContext();
    const { ipv4SummaryArray, setIPv4SummaryArray } = useAppContext();

    const handleIPv4AddressChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value, id } = event.target;
        setAddressAndSubnetForSummary({ ...addressAndSubnetForSummary, ipAddress: value });
        setIPv4SummaryArray(
            ipv4SummaryArray.map((value, index) =>
                index === parseInt(id, 10) ? addressAndSubnetForSummary : value,
            ),
        );
        // console.log(ipv4SummaryArray);
    };

    const handleSubnetChange = (event: SelectChangeEvent, selectedIndex: number): void => {
        const { value } = event.target;
        // console.log(selectedIndex);
        // console.log(value);
        setAddressAndSubnetForSummary({ ...addressAndSubnetForSummary, subnet: value });
        setIPv4SummaryArray(
            ipv4SummaryArray.map((value, index) =>
                index === selectedIndex ? addressAndSubnetForSummary : value,
            ),
        );
    };

    const renderAddressAndSubnet = ipv4SummaryArray.map((ipv4: IPv4Address, index: number) => (
        <Stack
            key={index}
            direction={"row"}
            component="form"
            spacing={2}
            sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                maxWidth: 500,
            }}
            autoComplete="off"
            justifyContent="center"
            alignItems="center"
        >
            {/* InputIPv4AddressForSummary */}
            <TextField
                id={index.toString()}
                label="IPv4 address"
                variant="filled"
                sx={{ minWidth: 225 }}
                placeholder={DefaultIPv4.placeholder}
                onChange={handleIPv4AddressChange}
            />
            {/* SelectIPv4Subnet */}
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Subnet</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id={index.toString()}
                    data-testid="subnet"
                    label="Subnet"
                    defaultValue={DefaultIPv4.subnet}
                    onChange={(event) => handleSubnetChange(event, index)}
                >
                    {subnetString.map((subnetString, subnetIndex) => {
                        return (
                            <MenuItem key={subnetString} value={getIPv4SubnetValue(subnetIndex)}>
                                {subnetString}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Stack>
    ));

    return (
        <Stack spacing={1}>
            {renderAddressAndSubnet}
            <Stack direction={"row"} spacing={5} justifyContent="center" alignItems="center">
                <RemoveAddressAndSubnetIcon />
                <AddAddressAndSubnetIcon />
            </Stack>
            <CalculateButton />
            <Divider flexItem />
        </Stack>
    );
});

export default IPv4Summary;
