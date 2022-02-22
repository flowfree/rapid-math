import { render } from '@testing-library/react'
import Multiplication from './Multiplication'

describe('Multiplication', () => {
  test('renders multiplication operation', () => {
    const { getByText } = render(<Multiplication op1={123} op2={456} />)
    expect(getByText(/123 × 456/)).toBeInTheDocument()
  })
})