import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

import DnDTableRow from "./DnDTableRow";
import update from "immutability-helper";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const Container = (props) => {
  {
    const classes = useStyles();

    const {rows, tableId, onChangeData} = props;    
    
    const removeRow = (index) => {
      onChangeData(
        update(rows, {$splice: [[index, 1]]})
      );
    }

    const insertRow = (index, row) => {
      onChangeData(
        update(rows, {
          $splice: [[index, 0, row]]
        })
      );
      
    }
    
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {rows.map((row, i) => (
              <DnDTableRow
                key={row.id}
                index={i}
                id={row.id}
                tableId={tableId}
                rowInfo={row}
                removeRow={removeRow}
                insertRow={insertRow}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};
export default Container;
