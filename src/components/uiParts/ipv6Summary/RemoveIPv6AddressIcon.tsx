import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import React, { FC, memo } from "react";

const RemoveIPv6AddressIcon: FC = memo(function removeIPv6AddressIcon() {
    return (
        <IconButton disabled>
            <RemoveIcon />
        </IconButton>
    );
});

export default RemoveIPv6AddressIcon;
