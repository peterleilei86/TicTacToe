import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Winner } from './Game';

const History = ({ winner, time }: { winner: Winner; time: number }) => {
	return (
		<div className='flex justify-between items-center w-1/2 m-auto'>
			<p>{winner === 'X' ? 'You Won' : winner === 'O' ? 'Computer Won' : 'It was a Draw.'}</p>
			<p>{formatDistanceToNow(time, { includeSeconds: true, addSuffix: true })}</p>
		</div>
	);
};

export default History;
