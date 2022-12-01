import Button from "@mui/material/Button";
import React, { FC, memo } from "react";

import { useAppContextForIPv6Summary } from "../../../contexts/AppContextForIPv6Summary";
import { checkAllValidIPv6AddressesExist } from "../../../util/ipv6AddressValidation";

const CalculateIPv6SummaryButton: FC = memo(function calculateIPv6Summary() {
    const { ipv6SummaryArray, setAllValidIPv6AddressesExist, setCanCalculateIPv6Summary } =
        useAppContextForIPv6Summary();

    const handleCalculateClick = (): void => {
        setAllValidIPv6AddressesExist(checkAllValidIPv6AddressesExist(ipv6SummaryArray));
        setCanCalculateIPv6Summary(checkAllValidIPv6AddressesExist(ipv6SummaryArray));
        // console.log(ipv6SummaryArray);
    };

    return (
        <Button variant="contained" onClick={handleCalculateClick}>
            Calculate
        </Button>
    );
});

export default CalculateIPv6SummaryButton;
