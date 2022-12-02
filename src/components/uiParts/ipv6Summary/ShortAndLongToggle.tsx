import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { FC, memo, MouseEvent } from "react";

import { useAppContextForIPv6Summary } from "../../../contexts/AppContextForIPv6Summary";

const ShortAndLongToggle: FC = memo(function shortAndLongToggle() {
    const { isShort, setIsShort, alignment, setAlignment } = useAppContextForIPv6Summary();

    const handleShortLongToggle = (event: MouseEvent, newAlignment: string): void => {
        // console.log(newAlignment);
        if (newAlignment !== null) setAlignment(newAlignment);
        if (newAlignment === "short") setIsShort(true);
        else setIsShort(false);
    };

    return (
        <ToggleButtonGroup
            fullWidth
            color="primary"
            value={alignment}
            exclusive
            onChange={handleShortLongToggle}
            aria-label="Platform"
        >
            <ToggleButton value="short">short</ToggleButton>
            <ToggleButton value="long">long</ToggleButton>
        </ToggleButtonGroup>
    );
});

export default ShortAndLongToggle;
