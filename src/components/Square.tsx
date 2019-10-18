import React from 'react'
import {Tile} from './Game'

interface SquareProps {
  value: Tile
  onClick: (e: React.SyntheticEvent) => void
}

const Square = ({value, onClick}: SquareProps) => {
  return (
    <button data-testid='square' disabled={!!value} className='square' onClick={onClick}>
      {value}
    </button>
  )
}

export default Square
