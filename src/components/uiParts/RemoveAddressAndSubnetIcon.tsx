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

    const isMinimumIPv4SummaryArray = (): boolean => {
        return ipv4SummaryArray.length <= 2;
    };

    return (
        <div>
            {isMinimumIPv4SummaryArray() ? (
                <IconButton disabled>
                    <RemoveIcon />
                </IconButton>
            ) : (
                <IconButton>
                    <RemoveIcon onClick={removeAddressAndSubnet} />
                </IconButton>
            )}
        </div>
    );
});

export default RemoveAddressAndSubnetIcon;
