import React, { FC, memo } from "react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import { useAppContext, AppContextProvider } from "../../contexts/AppContext";

const AddAddressAndSubnetIcon: FC = memo(function addAddressAndSubnet() {
    const { ipv4SummaryArray, setIPv4SummaryArray } = useAppContext();

    const addAddressAndSubnet = (): void => {
        setIPv4SummaryArray([...ipv4SummaryArray, { ipAddress: "", subnet: "24" }]);
    };

    return (
        <IconButton>
            <AddIcon onClick={addAddressAndSubnet} />
        </IconButton>
    );
});

export default AddAddressAndSubnetIcon;
