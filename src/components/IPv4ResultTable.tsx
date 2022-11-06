import React, { FC, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import CopyToClipBoard from "react-copy-to-clipboard";

import { ipv4ResultTable } from "../data/ipv4ResultTable";
import { ipv4Calculator } from "../util/ipv4Calculator";

const IPv4ResultTable: FC<{ ipv4Address: string; subnet: string }> = ({ ipv4Address, subnet }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableBody>
                    {ipv4ResultTable.map((type, index) => (
                        <TableRow key={index}>
                            <TableCell>{type}</TableCell>
                            <TableCell align="right">
                                {ipv4Calculator(type, ipv4Address, subnet)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default IPv4ResultTable;
