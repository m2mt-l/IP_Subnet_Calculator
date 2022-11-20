import React, { FC, memo } from "react";

import Button from "@mui/material/Button";

const CalculateButton: FC = memo(function calculateButton() {
    return <Button variant="contained">Calculate</Button>;
});

export default CalculateButton;
