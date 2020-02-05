import React from 'react'
import Square from './Square'
import {Tiles} from './Game'

type BoardProps = {
  squares: Tiles
  onClick: (index: number) => void
}

const Board = ({squares, onClick}: BoardProps) => {
  const renderSquare = (index: number) => {
    const handleClick = (e: React.SyntheticEvent) => onClick(index)
    return <Square value={squares[index]} onClick={handleClick} />
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='w-2/5 h-auto flex flex-wrap'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

export default Board
