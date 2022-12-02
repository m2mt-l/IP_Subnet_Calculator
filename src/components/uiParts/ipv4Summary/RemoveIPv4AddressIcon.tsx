import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import React, { FC, memo } from "react";

import { useAppContextForIPv4Summary } from "../../../contexts/AppContextForIPv4Summary";
import { MIN_IPV4_ADDRESS_SUMMARY } from "../../../data/ipv4SummaryDefaultValue";

const RemoveIPv4AddressIcon: FC = memo(function removeAddressAndSubnet() {
    const { ipv4SummaryArray, setIPv4SummaryArray } = useAppContextForIPv4Summary();

    const removeAddressAndSubnet = (): void => {
        setIPv4SummaryArray(
            ipv4SummaryArray.filter((ipv4, index) => index !== ipv4SummaryArray.length - 1),
        );
    };

    const isMinimumIPv4SummaryArray = (): boolean => {
        return ipv4SummaryArray.length <= MIN_IPV4_ADDRESS_SUMMARY;
    };

    return (
        <div>
            {isMinimumIPv4SummaryArray() ? (
                <IconButton disabled>
                    <RemoveIcon />
                </IconButton>
            ) : (
                <IconButton onClick={removeAddressAndSubnet}>
                    <RemoveIcon />
                </IconButton>
            )}
        </div>
    );
});

export default RemoveIPv4AddressIcon;
