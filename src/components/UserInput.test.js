import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserInput from './UserInput'

describe('UserInput', () => {
  test('renders text fields', () => {
    const { getAllByRole } = render(<UserInput answer={12345} />)

    const textboxes = getAllByRole('textbox')
    expect(textboxes.length).toEqual(5)
  })

  test('fires callback on correct answer', () => {
    const fn = jest.fn()

    const { getAllByRole } = render(<UserInput answer={12345} onCompleted={fn} />)
    const textboxes = getAllByRole('textbox')

    expect(fn.mock.calls.length).toEqual(0)

    userEvent.keyboard('12345')

    expect(fn.mock.calls.length).toEqual(1)
  })

  test('moves cursor with arrow keys', () => {
    const { getAllByRole } = render(<UserInput answer={12345} />)
    const textboxes = getAllByRole('textbox')

    userEvent.keyboard('{arrowright}54')

    expect(textboxes[0]).toHaveValue('')
    expect(textboxes[1]).toHaveValue('5')
    expect(textboxes[2]).toHaveValue('4')
    expect(textboxes[3]).toHaveValue('')
    expect(textboxes[4]).toHaveValue('')
  })

  test('Enable deletion with backspace', () => {
    const { getAllByRole } = render(<UserInput answer={12345} />)
    const textboxes = getAllByRole('textbox')

    userEvent.keyboard('1234')

    expect(textboxes[0]).toHaveValue('1')
    expect(textboxes[1]).toHaveValue('2')
    expect(textboxes[2]).toHaveValue('3')
    expect(textboxes[3]).toHaveValue('4')
    expect(textboxes[4]).toHaveValue('')

    userEvent.keyboard('{arrowleft}{backspace}')

    expect(textboxes[0]).toHaveValue('1')
    expect(textboxes[1]).toHaveValue('2')
    expect(textboxes[2]).toHaveValue('3')
    expect(textboxes[3]).toHaveValue('')
    expect(textboxes[4]).toHaveValue('')
  })

  test('Enable reset with ESC key', () => {
    const { getAllByRole } = render(<UserInput answer={12345} />)
    const textboxes = getAllByRole('textbox')

    userEvent.keyboard('1234')

    expect(textboxes[0]).toHaveValue('1')
    expect(textboxes[1]).toHaveValue('2')
    expect(textboxes[2]).toHaveValue('3')
    expect(textboxes[3]).toHaveValue('4')
    expect(textboxes[4]).toHaveValue('')

    userEvent.keyboard('{escape}')

    expect(textboxes[0]).toHaveValue('')
    expect(textboxes[1]).toHaveValue('')
    expect(textboxes[2]).toHaveValue('')
    expect(textboxes[3]).toHaveValue('')
    expect(textboxes[4]).toHaveValue('')
  })
})
