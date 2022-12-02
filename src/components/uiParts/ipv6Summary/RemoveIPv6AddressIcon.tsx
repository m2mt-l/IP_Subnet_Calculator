import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import React, { FC, memo } from "react";

import { useAppContextForIPv6Summary } from "../../../contexts/AppContextForIPv6Summary";
import { MIN_IPV6_ADDRESS_SUMMARY } from "../../../data/ipv6SummaryDefaultValue";

const RemoveIPv6AddressIcon: FC = memo(function removeIPv6AddressIcon() {
    const { ipv6SummaryArray, setIPv6SummaryArray } = useAppContextForIPv6Summary();

    const removeAddressAndSubnet = (): void => {
        setIPv6SummaryArray(
            ipv6SummaryArray.filter((ipv6, index) => index !== ipv6SummaryArray.length - 1),
        );
    };

    const isMinimumIPv6SummaryArray = (): boolean => {
        return ipv6SummaryArray.length <= MIN_IPV6_ADDRESS_SUMMARY;
    };

    return (
        <div>
            {isMinimumIPv6SummaryArray() ? (
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

export default RemoveIPv6AddressIcon;
