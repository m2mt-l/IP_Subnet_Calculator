import React, { FC, useState, useEffect } from "react";

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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import CopyToClipBoard from "react-copy-to-clipboard";

import { ipv4ResultTable } from "../data/ipv4ResultTable";
import { ipv4Calculator } from "../util/ipv4Calculator";

const IPv4ResultTable: FC<{ ipv4Address: string; subnet: string }> = ({ ipv4Address, subnet }) => {
    console.log("check render IPv4ResultTable");
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 370, maxWidth: 500 }} aria-label="simple table">
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
