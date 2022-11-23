import React, { FC, memo, useEffect } from "react";

import Button from "@mui/material/Button";

import { useAppContext } from "../../contexts/AppContext";

const CalculateButton: FC = memo(function calculateButton() {
    const { ipv4SummaryArray, setIPv4SummaryArray } = useAppContext();

    const handleCalculateClick = (): void => {
        console.log(ipv4SummaryArray);
    };

    return (
        <Button variant="contained" onClick={handleCalculateClick}>
            Calculate
        </Button>
    );
});

export default CalculateButton;
