import React from 'react'
import {Tile} from './Game'

interface SquareProps {
  value: Tile
  onClick: (e: React.SyntheticEvent) => void
}

const Square = ({value, onClick}: SquareProps) => {
  return (
    <button
      data-testid='square'
      disabled={!!value}
      className='w-1/3 h-24 border-2 font-bold text-5xl bg-gray-100 hover:bg-green-400'
      onClick={onClick}
    >
      {value}
    </button>
  )
}

export default Square
