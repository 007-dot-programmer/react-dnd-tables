import React, { useImperativeHandle, useRef } from "react";
import { DragSource, DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const DnDTableRow = React.forwardRef(
  ({ rowInfo, isDragging, connectDragSource, connectDropTarget }, ref) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    const opacity = isDragging ? 0 : 1;
    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current
    }));

    return (
      <TableRow ref={elementRef} styles={opacity}>
        <TableCell>{rowInfo.id}</TableCell>
        <TableCell>{rowInfo.text}</TableCell>
      </TableRow>
    );
  }
);
export default DropTarget(
  ItemTypes.DnDTableRow,
  {   
    drop(props, monitor, component) {
      const dragEndItem = props;
      const dragSourceItem = monitor.getItem();
      console.log(dragSourceItem, dragEndItem)
      if  (dragSourceItem.tableId === dragEndItem.tableId)
        return;
      dragEndItem.insertRow(dragEndItem.index, dragSourceItem.rowInfo)
      dragSourceItem.removeRow(dragSourceItem.index);      
    }
  },
  (connect) => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    ItemTypes.DnDTableRow,
    {
      beginDrag: (props) => ({
        id: props.id,
        index: props.index,
        rowInfo: props.rowInfo,
        tableId: props.tableId,
        insertRow: props.insertRow,
        removeRow: props.removeRow
      })
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(DnDTableRow)
);
