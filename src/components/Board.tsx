import React from 'react';
import Square from './Square';
import { Tiles } from './Game';

type BoardProps = {
	squares: Tiles;
	onClick: (index: number) => void;
};

const Board = ({ squares, onClick }: BoardProps) => {
	const renderSquare = (index: number) => {
		const handleClick = (e: React.SyntheticEvent) => onClick(index);
		return <Square value={squares[index]} onClick={handleClick} />;
	};

	return (
		<div className='flex items-center justify-center'>
			<div className='w-2/5 h-auto flex flex-wrap'>
				{Array(9)
					.fill(null)
					.map((_, i) => renderSquare(i))}
			</div>
		</div>
	);
};

export default Board;
