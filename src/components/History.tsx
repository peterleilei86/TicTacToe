import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Winner } from './Game';

const History = ({ winner, time }: { winner: Winner; time: number }) => {
	return (
		<div className='flex justify-between items-center w-2/3 m-auto hover:bg-gray-100 hover:shadow-md cursor-pointer my-3 p-3 font-bold rounded'>
			<p>{winner === 'X' ? 'You Won' : winner === 'O' ? 'Computer Won' : 'It was a Draw.'}</p>
			<p>{formatDistanceToNow(time, { includeSeconds: true, addSuffix: true })}</p>
		</div>
	);
};

export default History;
