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
import InputIPv4AddressForSummary from "./uiParts/InputIPv4AddressForSummary";
import SelectIPv4Subnet from "./uiParts/SelectIPv4Subnet";
import CalculateButton from "./uiParts/CalculateButton";
import AddAddressAndSubnetIcon from "./uiParts/AddAddressAndSubnetIcon";
import RemoveAddressAndSubnetIcon from "./uiParts/RemoveAddressAndSubnetIcon";
import { useAppContext } from "../contexts/AppContext";

const IPv4Summary: FC = memo(function ipv4Summary() {
    const { ipv4SummaryArray } = useAppContext();
    console.log(ipv4SummaryArray);

    const renderAddressAndSubnet = ipv4SummaryArray.map((ipv4: IPv4Address, index: number) => (
        <Stack
            key={index}
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
            <SelectIPv4Subnet />
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
