import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import {
  Box,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";

MuiTableHeadList.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function MuiTableHeadList({
  order,
  orderBy,
  headLabel,
  onRequestSort,
  checkbox_selection,
  handleSelectAllClick,
  rowCount,
  numSelected,
}) {
  const [tableHead, setTableHead] = useState([]);
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  useEffect(() => {
    if (checkbox_selection) {
      const select_all = {
        id: "is_checkbox_selected",
        label: (
          <Tooltip title="Select Or Unselect All">
            <Checkbox
              checked={rowCount === numSelected ? true : false}
              onClick={(e) => handleSelectAllClick(e)}
            />
          </Tooltip>
        ),
        alignRight: false,
      };
      const new_array = [select_all].concat(headLabel);
      setTableHead(new_array);
    } else {
      setTableHead(headLabel);
    }
    // eslint-disable-next-line
  }, [headLabel, rowCount, numSelected]);

  return (
    <TableHead className="table-heading mt-5 table-head-sticky">
      <TableRow>
        {tableHead.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
            // className="text-nowrap fw-semibold table-heading-text"
            className={`${headCell.label === "Customer Name" ? "table-name-cell-head": ""} text-nowrap fw-semibold table-heading-text`}
          >
            <TableSortLabel
              hideSortIcon
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
