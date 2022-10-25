import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const DGrid = (props) => {
  const { data, setSelectedRow } = props;

  // define table columns
  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "date", headerName: "Date", flex: 2 },
    { field: "relAngle", headerName: "Release Angle°", flex: 1 },
    { field: "armInt", headerName: "Arm Int Angle°", hide: true },
    { field: "armExt", headerName: "Arm Ext Angle°", flex: 1 },
    { field: "ovrRate", headerName: "Overall Rating", flex: 1 },
  ];

  const rows = data.map((row) => ({
    id: row.date,
    date:
      row.date.toDate().toDateString() +
      ", " +
      row.date.toDate().toLocaleTimeString(),
    relAngle: row.relAngle,
    armInt: row.armInt,
    armExt: row.armExt,
    ovrRate: Math.round(100 - Math.abs(1 - (row.relAngle / 48 + row.armExt / 15) / 2) * 10),
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
            pageSize={8}
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = rows.filter((row) =>
                selectedIDs.has(row.id)
              );
              setSelectedRow(selectedRows);
            }}
            rowsPerPageOptions={[8, 10, 20]}
            getCellClassName={(params) => {
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
