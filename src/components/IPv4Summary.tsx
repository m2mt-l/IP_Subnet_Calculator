import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { FC, ChangeEvent, memo } from "react";

// Material UI

import { useAppContext } from "../contexts/AppContext";
import { generateIPv4Slash } from "../data/ipv4Subnet";
import { DefaultIPv4 } from "../data/ipv4SubnetDefaultValue";
import { IPv4Address } from "../model/IPv4Address";
import { getIPv4SubnetValue } from "../util/ipv4Subnet";
import AddAddressAndSubnetIcon from "./uiParts/AddAddressAndSubnetIcon";
import CalculateButton from "./uiParts/CalculateButton";
import RemoveAddressAndSubnetIcon from "./uiParts/RemoveAddressAndSubnetIcon";
import ResultIPv4Summary from "./ResultIPv4Summary";

const IPv4Summary: FC = memo(function ipv4Summary() {
    const subnetString = generateIPv4Slash();
    const {
        ipv4SummaryArray,
        setIPv4SummaryArray,
        allValidIPv4AddressesExist,
        setAllValidIPv4AddressesExist,
        canCalculateIPv4Summary,
        setCanCalculateIPv4Summary,
    } = useAppContext();

    const handleIPv4AddressChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value, id } = event.target;
        setIPv4SummaryArray(
            ipv4SummaryArray.map((ipv4Address, index) =>
                index === parseInt(id, 10)
                    ? { ...ipv4SummaryArray[index], ipAddress: value }
                    : ipv4Address,
            ),
        );
    };

    const handleSubnetChange = (event: SelectChangeEvent, selectedIndex: number): void => {
        const { value } = event.target;
        // console.log(selectedIndex);
        // console.log(value);
        setIPv4SummaryArray(
            ipv4SummaryArray.map((ipv4Address, index) =>
                index === selectedIndex
                    ? { ...ipv4SummaryArray[index], subnet: value }
                    : ipv4Address,
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
            {!allValidIPv4AddressesExist && (
                <Typography align="center" sx={{ color: "error.main" }}>
                    {DefaultIPv4.validationError}
                </Typography>
            )}
            <Divider flexItem />
            {canCalculateIPv4Summary && <ResultIPv4Summary />}
        </Stack>
    );
});

export default IPv4Summary;
