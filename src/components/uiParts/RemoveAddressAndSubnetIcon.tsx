import React, { FC, memo } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";

const RemoveAddressAndSubnetIcon: FC = memo(function removeAddressAndSubnet() {
    return (
        <IconButton>
            <RemoveIcon />
        </IconButton>
    );
});

export default RemoveAddressAndSubnetIcon;
