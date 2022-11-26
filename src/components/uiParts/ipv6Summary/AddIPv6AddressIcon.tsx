import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import React, { FC, memo } from "react";

const AddIPv6AddressIcon: FC = memo(function addIPv6AddressIcon() {
    return (
        <IconButton disabled>
            <AddIcon />
        </IconButton>
    );
});

export default AddIPv6AddressIcon;
