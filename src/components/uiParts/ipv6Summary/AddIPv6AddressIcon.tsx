import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import React, { FC, memo } from "react";

import { useAppContextForIPv6Summary } from "../../../contexts/AppContextForIPv6Summary";
const AddIPv6AddressIcon: FC = memo(function addIPv6AddressIcon() {
    const { ipv6SummaryArray, setIPv6SummaryArray } = useAppContextForIPv6Summary();

    const addAddressAndSubnet = (): void => {
        setIPv6SummaryArray([...ipv6SummaryArray, { ipAddress: "", subnet: "64", isShort: true }]);
    };

    const isMaximumIPv4SummaryArray = (): boolean => {
        return ipv6SummaryArray.length >= 10;
    };

    return (
        <div>
            {isMaximumIPv4SummaryArray() ? (
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
