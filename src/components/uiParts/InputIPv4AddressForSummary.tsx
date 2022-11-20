import React, { FC, memo } from "react";

import TextField from "@mui/material/TextField";

import { DefaultIPv4 } from "../../data/ipv4SubnetDefaultValue";

const InputIPv4AddressForSummary: FC = memo(function inputIPv4AddressForSummary() {
    return (
        <TextField
            id="filled-basic"
            label="IPv4 address"
            variant="filled"
            sx={{ minWidth: 200 }}
            placeholder={DefaultIPv4.placeholder}
        />
    );
});

export default InputIPv4AddressForSummary;
