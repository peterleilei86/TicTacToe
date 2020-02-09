import React, { useState, useEffect } from 'react';
import Board from './Board';
import { calcWinner, calMove } from '../utils';
import { useLocalStorage } from '../hooks/useLocalStorage';
import History from './History';

export type CurrentPlayer = 'X' | 'O';
export type Tile = CurrentPlayer | null;
export type Tiles = Tile[];
export type Winner = CurrentPlayer | 'draw' | null;

interface GameHistory {
	time: number;
	winner: Winner;
}

const COMPUTER = 'O';
const HUMAN = 'X';

const LOCALSTORAGE_SQUARES = 'SQUARES';
const LOCALSTORAGE_HISTORY = 'HISTORY';

const Game: React.FC = () => {
	const [squares, setSquares] = useLocalStorage(LOCALSTORAGE_SQUARES, Array(9).fill(null));
	const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>(HUMAN);
	const [winner, setWinner] = useState<Winner>(null);
	const [history, setHistory] = useLocalStorage(LOCALSTORAGE_HISTORY, [] as History[]);
	const [showHistory, setShowHistory] = useState(false);

	const handleClick = (index: number) => {
		const newSquares = squares.map((s: Tile, i: number) => (i === index ? currentPlayer : s));
		setSquares(newSquares);
		const newCurrentPlayer = currentPlayer === 'X' ? 'O' : 'X';
		setCurrentPlayer(newCurrentPlayer);
	};

	const handleReset = (e: React.SyntheticEvent) => {
		setSquares(Array(9).fill(null));
		setCurrentPlayer(HUMAN);
		setWinner(null);
		setShowHistory(false);
	};

	const toggleShowHistory = () => setShowHistory(prev => !prev);

	useEffect(() => {
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
		const winner = calcWinner(squares);
		if (winner) {
			setWinner(winner);
			setHistory((h: History[]) => [...h, { time: Date.now(), winner }]);
		} else if (!winner && squares.every((s: any) => s !== null)) {
			setWinner('draw');
			setHistory((h: History[]) => [...h, { time: Date.now(), winner: 'draw' }]);
		} else if (currentPlayer === COMPUTER) {
			makeMove(squares);
		}
	}, [squares, setSquares, setHistory, currentPlayer]);

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
				<button
					className='w-24 h-12 bg-green-400 hover:bg-green-600 text-white font-bold text-xs px-2 py-2 mx-10 rounded absolute left-0 top-0'
					onClick={toggleShowHistory}
				>
					{showHistory ? 'Hide' : 'Show'} history
				</button>
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
			{showHistory && history.map((h: any) => <History winner={h.winner} time={h.time} />)}
		</div>
	);
};

export default Game;
