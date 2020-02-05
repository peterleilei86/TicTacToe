import React, { useState, useEffect } from 'react';
import Board from './Board';
import { calcWinner, calMove } from '../utils';

export type CurrentPlayer = 'X' | 'O';
export type Tile = CurrentPlayer | null;
export type Tiles = Tile[];
type Winner = CurrentPlayer | 'draw' | null;

const COMPUTER = 'O';
const HUMAN = 'X';

const Game: React.FC = () => {
	const [squares, setSquares] = useState<Tiles>(Array(9).fill(null));
	const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>(HUMAN);
	const [winner, setWinner] = useState<Winner>(null);

	const handleClick = (index: number) => {
		if (winner) {
			return;
		}
		const newSquares = squares.map((s: Tile, i: number) => (i === index ? currentPlayer : s));
		setSquares(newSquares);
		const newCurrentPlayer = currentPlayer === 'X' ? 'O' : 'X';
		setCurrentPlayer(newCurrentPlayer);
	};

	const makeMove = (squares: Tiles) => {
		const index = calMove(squares);
		if (index >= 0) {
			const newSquares = squares.map((s, i) => {
				if (i === index) {
					return COMPUTER;
				}
				return s;
			});
			setSquares(newSquares);
			setCurrentPlayer(HUMAN);
		}
	};

	const handleReset = (e: React.SyntheticEvent) => {
		setSquares(Array(9).fill(null));
		setCurrentPlayer(HUMAN);
		setWinner(null);
	};

	useEffect(() => {
		if (calcWinner(squares)) {
			setWinner(calcWinner(squares));
		} else if (!calcWinner(squares) && squares.every(s => s !== null)) {
			setWinner('draw');
		} else if (currentPlayer === COMPUTER) {
			makeMove(squares);
		}
	}, [squares, currentPlayer]);

	const message =
		winner === 'X'
			? 'You win!'
			: winner === 'O'
			? 'Computer win!'
			: winner === 'draw'
			? "It's a draw!"
			: '';
	return (
		<div className='container w-1/2 py-3 border-2 my-3'>
			<div className='h-20 relative'>
				<h2 className='text-center font-bold sm:text-xl md:text-2xl lg:text-3xl'>Tic Tac Toe</h2>
				<button
					className='w-24 h-12 bg-green-400 hover:bg-green-600 text-white font-bold text-xl px-2 py-2 mx-10 rounded absolute right-0 top-0'
					onClick={handleReset}
				>
					Reset
				</button>
			</div>
			<Board squares={squares} onClick={(index: number) => handleClick(index)} />
			{winner && <p className='text-center font-bold text-3xl text-green-400 my-5'>{message}</p>}
		</div>
	);
};

export default Game;
