import { render } from '@testing-library/react'
import Substraction from './Substraction'

describe('Substraction', () => {
  test('renders substraction operation', () => {
    const { getByText } = render(<Substraction op1={5} op2={3} />)
    expect(getByText(/5 − 3/)).toBeInTheDocument()
  })
})
