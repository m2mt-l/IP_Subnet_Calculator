import React, { FC, memo } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";

import { useAppContext } from "../../contexts/AppContext";

const RemoveAddressAndSubnetIcon: FC = memo(function removeAddressAndSubnet() {
    const { ipv4SummaryArray, setIPv4SummaryArray } = useAppContext();

    const removeAddressAndSubnet = (): void => {
        setIPv4SummaryArray(
            ipv4SummaryArray.filter((ipv4, index) => index !== ipv4SummaryArray.length - 1),
        );
    };

    return (
        <IconButton>
            <RemoveIcon onClick={removeAddressAndSubnet} />
        </IconButton>
    );
});

export default RemoveAddressAndSubnetIcon;
