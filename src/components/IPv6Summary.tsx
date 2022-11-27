import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { FC, ChangeEvent, memo } from "react";

import { useAppContextForIPv6Summary } from "../contexts/AppContextForIPv6Summary";
import { generateIPv6Slash } from "../data/ipv6Subnet";
import { DefaultIPv6 } from "../data/ipv6SubnetDefaultValue";
import { IPv6Address } from "../model/IPv6Address";
import { getIPv6SubnetValue } from "../util/ipv6Subnet";
import ResultIPv6Summary from "./ResultIPv6Summary";
import AddIPv6AddressIcon from "./uiParts/ipv6Summary/AddIPv6AddressIcon";
import CalculateIPv6SummaryButton from "./uiParts/ipv6Summary/CalculateIPv6SummaryButton";
import RemoveIPv6AddressIcon from "./uiParts/ipv6Summary/RemoveIPv6AddressIcon";

const IPv6Summary: FC = memo(function IPv6Summary() {
    const subnetString = generateIPv6Slash();
    const {
        ipv6SummaryArray,
        setIPv6SummaryArray,
        allValidIPv6AddressesExist,
        canCalculateIPv6Summary,
    } = useAppContextForIPv6Summary();

    const handleIPv6AddressChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value, id } = event.target;
        // console.log(value);
        setIPv6SummaryArray(
            ipv6SummaryArray.map((ipv6Address, index) =>
                index === parseInt(id, 10)
                    ? { ...ipv6SummaryArray[index], ipAddress: value }
                    : ipv6Address,
            ),
        );
    };

    const handleSubnetChange = (event: SelectChangeEvent, selectedIndex: number): void => {
        const { value } = event.target;
        // console.log(selectedIndex);
        // console.log(value);
        setIPv6SummaryArray(
            ipv6SummaryArray.map((ipv6Address, index) =>
                index === selectedIndex
                    ? { ...ipv6SummaryArray[index], subnet: value }
                    : ipv6Address,
            ),
        );
    };

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
                onChange={handleIPv6AddressChange}
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
                    onChange={(event) => handleSubnetChange(event, index)}
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
            {!allValidIPv6AddressesExist && (
                <Typography align="center" sx={{ color: "error.main" }}>
                    {DefaultIPv6.validationError}
                </Typography>
            )}
            <Divider flexItem />
            {canCalculateIPv6Summary && <ResultIPv6Summary />}
        </Stack>
    );
});

export default IPv6Summary;
