import React, { FC, memo, useContext, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";

import { DefaultIPv4 } from "../../data/ipv4SubnetDefaultValue";

import { useAppContext, AppContextProvider } from "../../contexts/AppContext";
import { IPv4Address } from "../../model/IPv4Address";

const InputIPv4AddressForSummary: FC = memo(function inputIPv4AddressForSummary() {
    const { addressAndSubnetForSummary, setAddressAndSubnetForSummary } = useAppContext();
    const { ipv4SummaryArray, setIPv4SummaryArray } = useAppContext();

    const handleIPv4AddressChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setAddressAndSubnetForSummary({ ...addressAndSubnetForSummary, ipAddress: value });
        console.log(addressAndSubnetForSummary);
    };

    return (
        <TextField
            id="filled-basic"
            label="IPv4 address"
            variant="filled"
            sx={{ minWidth: 225 }}
            placeholder={DefaultIPv4.placeholder}
            onChange={handleIPv4AddressChange}
        />
    );
});

export default InputIPv4AddressForSummary;
