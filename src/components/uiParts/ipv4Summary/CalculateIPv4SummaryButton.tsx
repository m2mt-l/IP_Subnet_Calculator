import Button from "@mui/material/Button";
import React, { FC, memo } from "react";

import { useAppContextForIPv4Summary } from "../../../contexts/AppContextForIPv4Summary";
import { checkAllValidIPv4AddressesExist } from "../../../util/ipv4AddressValidation";

const CalculateIPv4SummaryButton: FC = memo(function calculateButton() {
    const { ipv4SummaryArray, setAllValidIPv4AddressesExist, setCanCalculateIPv4Summary } =
        useAppContextForIPv4Summary();

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

export default CalculateIPv4SummaryButton;
