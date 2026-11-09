import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './mynsweepr.css';
import ModalContent from '../modal/modal';
import { Preboard } from '../models/preboard';
import { Board } from '../models/board';
import { Board as BoardComponent } from './board';

function Mynsweepr() {
  const [rows, setRows] = useState(9);
  const [cols, setCols] = useState(9);
  const [density, _setDensity] = useState(1/6); // 0.166667% density
  const [mines, setMines] = useState(Math.floor(rows * cols * density));
  const [isCustom, setIsCustom] = useState(false);
  const [board, setBoard] = useState<Board | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const setSize = (height: number, width: number) => {
    setRows(height);
    setCols(width);
//    const isStandard = (
//        (height === 9  && width === 9 ) || 
//        (height === 16 && width === 16) ||
//        (height === 16 && width === 30)
//    );
//    const isCustom = !isStandard;
//    setIsCustom(isCustom);
    setMines(Math.floor(height * width * density));
    let pre = new Preboard(width, height, density);
    setBoard(new Board(pre.generatePreboard()));
    const root: HTMLElement | null = document.querySelector('#root');
    if (root) {
        root.style.setProperty('--cols', `${width}`);
        root.style.setProperty('--rows', `${height}`);
    }
  }

  if (!board) {
    console.warn('Board is not initialized');
    setSize(9, 9);
    console.log('Board is initialized');
  }

  return (
    <div className="mynsweepr">
      <h1>Mynsweepr</h1>
      <div className="settings">
        <fieldset className="quick-fieldset">
            <legend>Quick Settings</legend>
            <div className="fieldset">
                <label htmlFor="size-small">Small:</label>
                <input
                    type="radio"
                    id="size-small"
                    name="size"
                    value="small"
                    checked={!isCustom && rows === 9 && cols === 9}
                    onChange={() => {
                        console.log('Small selected');
                        setSize(9, 9);
                        setIsCustom(false);
                    }}
                />
            </div>
            <div className="fieldset">
                <label htmlFor="size-medium">Medium:</label>
                <input
                    type="radio"
                    id="size-medium"
                    name="size"
                    value="medium"
                    checked={!isCustom && rows === 16 && cols === 16}
                    onChange={() => {
                        console.log('Medium selected');
                        setSize(16, 16);
                        setIsCustom(false);
                    }}
                />
            </div>
            <div className="fieldset">
                <label htmlFor="size-large">Large:</label>
                <input
                    type="radio"
                    id="size-large"
                    name="size"
                    value="large"
                    checked={!isCustom && rows === 16 && cols === 30}
                    onChange={() => {
                        console.log('Large selected');
                        setSize(16, 30);
                        setIsCustom(false);
                    }}
                />
            </div>
            <div className='fieldset'>
                <label htmlFor="size-custom">Custom:</label>
                <input
                    type="radio"
                    id="size-custom"
                    name="size"
                    value="custom"
                    checked={isCustom}
                    onChange={() => {
                        console.log('Custom selected');
                        setSize(rows, cols);
                        setIsCustom(true);
                    }}
                />
            </div>
        </fieldset>
        <fieldset className="custom-fieldset" disabled={!isCustom}>
            <legend>Custom Settings</legend>
            <div className="fieldset">
                <label htmlFor="rows">Rows:</label>
                <input
                    type="number"
                    id="rows"
                    value={rows}
                    onChange={(e) => {
                        const newRows = parseInt(e.target.value);
                        console.log('Rows changed to', newRows);
                        setRows(newRows);
                        setMines(Math.floor(newRows * cols * density));
                        let pre = new Preboard(cols, newRows, density);
                        setBoard(new Board(pre.generatePreboard()));
                    }}
                />
            </div>
            <div className="fieldset">
                <label htmlFor="cols">Columns:</label>
                <input
                    type="number"
                    id="cols"
                    value={cols}
                    onChange={(e) => {
                        const newCols = parseInt(e.target.value);
                        console.log('Cols changed to', newCols);
                        setCols(newCols);
                        setMines(Math.floor(rows * newCols * density));
                        let pre = new Preboard(newCols, rows, density);
                        setBoard(new Board(pre.generatePreboard()));
                    }}
                />
            </div>
        </fieldset>
        <fieldset className='score-fieldset'>
            <legend>Score</legend>
            <div className='fieldset'>
                <label htmlFor='time'>Time:</label>
                <input
                    type='text'
                    id='time'
                    value='00:00'
                    readOnly
                />
            </div>
            <div className='fieldset'>
                <label htmlFor='mines'>Mines:</label>
                <input
                    type='text'
                    id='mines'
                    value={mines}
                    readOnly
                />
            </div>
        </fieldset>
        <button className="start-button" type='button' onClick={() => { 
            console.log('Start game');
            setSize(rows, cols);
        }}>Start Game</button>
        <button className='reset-button' type='button' onClick={() => {
            console.log('Reset game', board);
            setBoard(null);
            setBoard(board);
        }}>Reset Game</button>
      </div>
      <BoardComponent board={board} />
      {createPortal(<ModalContent id="gameOver" title="Game Over" content='You lost 💩' isOpen={isGameOver} onClose={() => setIsGameOver(false)} />, document.body)}
      {createPortal(<ModalContent id="gameWon" title="Game Won" content='You won 👍🥇🏆🎉' isOpen={isGameWon} onClose={() => setIsGameWon(false)} />, document.body)}
    </div>
  );
}

export default Mynsweepr;
