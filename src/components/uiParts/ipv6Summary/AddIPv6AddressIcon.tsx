import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import React, { FC, memo } from "react";

import { useAppContextForIPv6Summary } from "../../../contexts/AppContextForIPv6Summary";
import { MAX_IPV6_ADDRESS_SUMMARY } from "../../../data/ipv6SummaryDefaultValue";

const AddIPv6AddressIcon: FC = memo(function addIPv6AddressIcon() {
    const { ipv6SummaryArray, setIPv6SummaryArray } = useAppContextForIPv6Summary();

    const addAddressAndSubnet = (): void => {
        setIPv6SummaryArray([...ipv6SummaryArray, { ipAddress: "", subnet: "64", isShort: true }]);
    };

    const isMaximumIPv6SummaryArray = (): boolean => {
        return ipv6SummaryArray.length >= MAX_IPV6_ADDRESS_SUMMARY;
    };

    return (
        <div>
            {isMaximumIPv6SummaryArray() ? (
                <IconButton disabled>
                    <AddIcon />
                </IconButton>
            ) : (
                <IconButton onClick={addAddressAndSubnet}>
                    <AddIcon />
                </IconButton>
            )}
        </div>
    );
});

export default AddIPv6AddressIcon;
