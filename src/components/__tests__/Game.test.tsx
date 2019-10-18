import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Game from '../Game'

describe('test game component', () => {
  it('should render with initial state', () => {
    const {getByText, queryAllByTestId} = render(<Game />)
    expect(getByText('Tic Tac Toe')).toBeDefined()
    expect(getByText('Reset')).toBeDefined()
    expect(queryAllByTestId('square')).toHaveLength(9)
  })

  it('should display X when square is clicked', () => {
    const {getByText, getAllByText, queryAllByTestId} = render(<Game />)
    const nodes = queryAllByTestId('square')
    fireEvent.click(nodes[0])
    expect(getAllByText('X')).toHaveLength(1)
  })

  it('should reset game', () => {
    const {getByText, getAllByText, queryAllByText, queryAllByTestId} = render(<Game />)
    const nodes = queryAllByTestId('square')
    fireEvent.click(nodes[0])
    expect(getAllByText('X')).toHaveLength(1)
    expect(getAllByText('O')).toHaveLength(1)
    const resetBtn = getByText('Reset')
    fireEvent.click(resetBtn)
    expect(queryAllByText('X')).toHaveLength(0)
    expect(queryAllByText('O')).toHaveLength(0)
  })

  it('should make a move after human makes each move', () => {
    const {getAllByText, queryAllByTestId} = render(<Game />)
    const nodes = queryAllByTestId('square')
    fireEvent.click(nodes[0])
    expect(getAllByText('X')).toHaveLength(1)
    expect(getAllByText('O')).toHaveLength(1)
  })
})
