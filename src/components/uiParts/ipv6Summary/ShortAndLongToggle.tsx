import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { FC, memo } from "react";

const ShortAndLongToggle: FC = memo(function shortAndLongToggle() {
    return (
        <ToggleButtonGroup fullWidth color="primary" exclusive aria-label="Platform">
            <ToggleButton value="short">short</ToggleButton>
            <ToggleButton value="long">long</ToggleButton>
        </ToggleButtonGroup>
    );
});

export default ShortAndLongToggle;
