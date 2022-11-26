import Button from "@mui/material/Button";
import React, { FC, memo } from "react";

import { useAppContext } from "../../contexts/AppContext";
import { checkAllValidIPv4AddressesExist } from "../../util/ipv4AddressValidation";

const CalculateButton: FC = memo(function calculateButton() {
    const { ipv4SummaryArray, setAllValidIPv4AddressesExist, setCanCalculateIPv4Summary } =
        useAppContext();

    const handleCalculateClick = (): void => {
        setAllValidIPv4AddressesExist(checkAllValidIPv4AddressesExist(ipv4SummaryArray));
        setCanCalculateIPv4Summary(checkAllValidIPv4AddressesExist(ipv4SummaryArray));
        console.log(ipv4SummaryArray);
    };

    return (
        <Button variant="contained" onClick={handleCalculateClick}>
            Calculate
        </Button>
    );
});

export default CalculateButton;
