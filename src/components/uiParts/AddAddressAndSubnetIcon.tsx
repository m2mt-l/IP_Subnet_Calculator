import React, { FC, memo } from "react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

const AddAddressAndSubnetIcon: FC = memo(function addAddressAndSubnet() {
    return (
        <IconButton>
            <AddIcon />
        </IconButton>
    );
});

export default AddAddressAndSubnetIcon;
