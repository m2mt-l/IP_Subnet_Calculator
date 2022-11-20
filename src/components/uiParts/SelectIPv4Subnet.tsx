import React, { FC, memo } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { generateIPv4Slash } from "../../data/ipv4Subnet";
import { DefaultIPv4 } from "../../data/ipv4SubnetDefaultValue";
import { getIPv4SubnetValue } from "../../util/ipv4Subnet";

const SelectIPv4Subnet: FC = memo(function selectIPv4Subnet() {
    const subnetString = generateIPv4Slash();

    return (
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
                        <MenuItem key={index} value={getIPv4SubnetValue(index)}>
                            {subnetString}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
});

export default SelectIPv4Subnet;
