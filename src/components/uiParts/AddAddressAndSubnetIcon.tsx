import React, { FC, memo } from "react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import { useAppContext } from "../../contexts/AppContext";

const AddAddressAndSubnetIcon: FC = memo(function addAddressAndSubnet() {
    const { ipv4SummaryArray, setIPv4SummaryArray } = useAppContext();

    const addAddressAndSubnet = (): void => {
        setIPv4SummaryArray([...ipv4SummaryArray, { ipAddress: "", subnet: "24" }]);
    };

    const isMaximumIPv4SummaryArray = (): boolean => {
        return ipv4SummaryArray.length >= 10;
    };

    return (
        <div>
            {isMaximumIPv4SummaryArray() ? (
                <IconButton disabled>
                    <AddIcon />
                </IconButton>
            ) : (
                <IconButton>
                    <AddIcon onClick={addAddressAndSubnet} />
                </IconButton>
            )}
        </div>
    );
});

export default AddAddressAndSubnetIcon;
