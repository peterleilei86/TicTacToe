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
    <div className='board'>
      <div className='row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

export default Board
