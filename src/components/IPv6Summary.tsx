import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { FC, memo } from "react";

import { useAppContextForIPv6Summary } from "../contexts/AppContextForIPv6Summary";
import { generateIPv6Slash } from "../data/ipv6Subnet";
import { DefaultIPv6 } from "../data/ipv6SubnetDefaultValue";
import { IPv6Address } from "../model/IPv6Address";
import { getIPv6SubnetValue } from "../util/ipv6Subnet";
import AddIPv6AddressIcon from "./uiParts/ipv6Summary/AddIPv6AddressIcon";
import CalculateIPv6SummaryButton from "./uiParts/ipv6Summary/CalculateIPv6SummaryButton";
import RemoveIPv6AddressIcon from "./uiParts/ipv6Summary/RemoveIPv6AddressIcon";

const IPv6Summary: FC = memo(function IPv6Summary() {
    const subnetString = generateIPv6Slash();
    const { ipv6SummaryArray, setIPv6SummaryArray } = useAppContextForIPv6Summary();

    const renderAddressAndSubnet = ipv6SummaryArray.map((ipv6: IPv6Address, index: number) => (
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
            {/* InputIPv6AddressForSummary */}
            <TextField
                id={index.toString()}
                label="IPv6 address"
                variant="filled"
                sx={{ minWidth: 380 }}
                placeholder={DefaultIPv6.placeholder}
            />
            {/* SelectIPv6Subnet */}
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Subnet</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id={index.toString()}
                    data-testid="subnet"
                    label="Subnet"
                    defaultValue={DefaultIPv6.subnet}
                >
                    {subnetString.map((subnetString, subnetIndex) => {
                        return (
                            <MenuItem key={subnetString} value={getIPv6SubnetValue(subnetIndex)}>
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
                <RemoveIPv6AddressIcon />
                <AddIPv6AddressIcon />
            </Stack>
            <CalculateIPv6SummaryButton />
            <Divider flexItem />
            {/* result ipv6 summary */}
        </Stack>
    );
});

export default IPv6Summary;
