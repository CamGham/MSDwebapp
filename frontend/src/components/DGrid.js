import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const DGrid = (props) => {
  const { data, setSelectedRow } = props;

  // console.log(data);

  // define table columns
  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "date", headerName: "Date", flex: 2 },
    { field: "relAngle", headerName: "Release Angle°", flex: 1 },
    { field: "armExt", headerName: "Arm Ext Angle°", flex: 1 },
    { field: "ovrRate", headerName: "Overall Rating", flex: 1 },
  ];

  const calcOvr = (props) => {
    // let p1 = props.relAngle/48;
    // let p2 = props.armExt/15;
    console.log(props);

    return 8;
  };

  const rows = data.map((row) => ({
    id: row.date,
    date:
      row.date.toDate().toDateString() +
      ", " +
      row.date.toDate().toLocaleTimeString(),
    relAngle: row.relAngle,
    armExt: row.armExt,
    ovrRate: 100 - Math.abs(1 - (row.relAngle / 48 + row.armExt / 15) / 2) * 10,
  }));

  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <div style={{ flexGrow: 1 }}>
        <Box
          sx={{
            "& .great": {
              backgroundColor: "rgba(157, 255, 118, 0.49)",
            },
            "& .ok": {
              backgroundColor: "#eeaa44",
            },
            "& .bad": {
              backgroundColor: "#eb4034",
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight={true}
            disableColumnMenu={true}
            // density={'compact'}
            pageSize={8}
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = rows.filter((row) =>
                selectedIDs.has(row.id)
              );
              setSelectedRow(selectedRows);
              // console.log(selectedRows[0])
            }}
            rowsPerPageOptions={[8, 10, 20]}
            getCellClassName={(params) => {
              // console.log(params.field)
              if (params.field === "relAngle") {
                if (params.value >= 44 && params.value <= 52) {
                  return "great";
                } else if (params.value >= 34 && params.value <= 62) {
                  return "ok";
                } else {
                  return "bad";
                }
              }

              if (params.field === "armExt") {
                if (params.value <= 30) {
                  return "great";
                } else if (params.value <= 40) {
                  return "ok";
                } else {
                  return "bad";
                }
              }
            }}
          />
        </Box>
      </div>
    </div>
  );
};

export default DGrid;
