import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import React, { FC, memo } from "react";

import { useAppContextForIPv4Summary } from "../../../contexts/AppContextForIPv4Summary";
import { MAX_IPV4_ADDRESS_SUMMARY } from "../../../data/ipv4SummaryDefaultValue";

const AddIPv4AddressIcon: FC = memo(function addAddressAndSubnet() {
    const { ipv4SummaryArray, setIPv4SummaryArray } = useAppContextForIPv4Summary();

    const addAddressAndSubnet = (): void => {
        setIPv4SummaryArray([...ipv4SummaryArray, { ipAddress: "", subnet: "24" }]);
    };

    const isMaximumIPv4SummaryArray = (): boolean => {
        return ipv4SummaryArray.length >= MAX_IPV4_ADDRESS_SUMMARY;
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

export default AddIPv4AddressIcon;
