import { Tiles, Winner } from '../components/Game';

const lines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

export const calcWinner = (squares: Tiles): Winner => {
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
			return squares[a];
		}
	}
	return null;
};

export const calMove = (squares: Tiles): number => {
	// if any line has two same tiles and one empty tile,
	// return index of the empty tile
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] === null && squares[b] === 'X' && squares[b] === squares[c]) {
			return a;
		}
		if (squares[b] === null && squares[a] === 'X' && squares[a] === squares[c]) {
			return b;
		}
		if (squares[c] === null && squares[a] === 'X' && squares[a] === squares[b]) {
			return c;
		}
	}
	// if no line has two same tiles
	// return the first empty tile
	return squares.findIndex(s => s === null);
};
