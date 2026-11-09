import React, { useState } from "react";
import "./cell.css";
import { CellProps } from "../models/cell";
import { ShowCellEvent, ShowCellsAroundEvent } from "../models/events";
import { TokenList } from "../models/tokenlist";

function Cell(props: CellProps) {
  const [isMine, _setIsMine] = useState(props.value < 0);
  const [nearby, _setNearby] = useState(props.value >= 0 ? props.value : -1);
  const [hidden, _setHidden] = useState(props.hidden);
  const [flagged, _setFlagged] = useState(props.flagged);
  const [value, _setValue] = useState(props.value);
  const [board, setBoard] = useState(props.board);

  const handleClick = () => {
    if (hidden && !flagged) {
      if (board) {
        const args = new ShowCellEvent(board, props.index);
        // Logic to reveal the cell and check for mines
        if (!isMine && value === 0) {
          // Logic to reveal adjacent cells
          const aroundArgs = new ShowCellsAroundEvent(board, props.index, props.index);
          setBoard(board.showCellsAround(aroundArgs));
        } else if (isMine) {
          // Logic to handle mine hit
          setBoard(board.showLoss());
        } else {
          // Logic to reveal the cell value
          setBoard(board.showCell(args));
        }
      }
    }
  };

  const handleDoubleClick = () => {
    if (!hidden && !flagged) {
      // Logic to reveal adjacent cells
        if (board) {
          const args = new ShowCellEvent(board, props.index);
          setBoard(board.showCell(args));
        }
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Logic to flag the cell
    if (hidden) {
      setBoard(board?.alterCellByIndex(props.index, "flagged", !flagged));
    }
  };

  const buttonClasses = new TokenList('cell');
  buttonClasses.toggle('hidden', hidden);
  buttonClasses.toggle('flagged', flagged);
  buttonClasses.toggle('mine', isMine);
  buttonClasses.toggle('nearby', nearby >= 0);
  buttonClasses.toggle(`nearby-${value}`, nearby >= 0);

  const sampleProps = {
    row: 0,
    col: 0,
    index: 0,
    isMine: false,
    hidden: true,
    flagged: false,
    value: 0
  } as CellProps;
  const sampleKeys = Object.keys(sampleProps);

  return (
    <button
      type="button"
      data-index={props.index}
      data-row={props.row}
      data-col={props.col}
      data-nearby={nearby >= 0 ? nearby : ""}
      className={buttonClasses.value}
      title={`${hidden ? "Hidden" : "Visible"}, ${
        flagged ? "Flagged" : "Unflagged"
      } Cell${nearby >= 1 ? ` with ${nearby} mine${nearby !== 1 ? "s" : ""} nearby` : ""}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleRightClick}
      data-debug={JSON.stringify(props, sampleKeys)}
    >
      {flagged
        ? "🚩"
        : hidden
        ? " "
        : isMine
        ? "💣"
        : nearby > 0
        ? nearby.toString()
        : " "}
    </button>
  );
}

export default Cell;
