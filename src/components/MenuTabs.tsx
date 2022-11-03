import React, { FC, useState, SyntheticEvent, ReactNode, ReactElement } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import IPv4Input from "./IPv4Input";
import IPv6Input from "./IPv6Input";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps): ReactElement {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const MenuTabs: FC = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event: SyntheticEvent, newValue: number): void => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label="menu tabs" centered>
                    <Tab label="IPv4" />
                    <Tab label="IPv6" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <IPv4Input />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <IPv6Input />
            </TabPanel>
        </Box>
    );
};

export default MenuTabs;
