import { useState, useEffect } from 'react'
import Multiplication from "./components/operations/Multiplication"
import UserInput from "./components/UserInput"

function getRandomNumber(start, end) {
  const numbers = []
  for (let i = start; i < end; i++) {
    numbers.push(i)
  }
  return numbers[Math.floor(Math.random() * numbers.length)]
}

function squaringOfNumbersBetween50And60() {
  const op = getRandomNumber(50, 60)
  return {
    op1: op,
    op2: op,
    answer: op * op
  }
}

function multiplicationWithASeriesOf1s() {
  const op1 = getRandomNumber(10, 100)
  const op2 = 11
  return {
    op1,
    op2,
    answer: op1 * op2,
    fromRight: true
  }
}

function multiplicationOfNumbersWhoseLastDigitsAddTo10AndTheRemainingDigitsAreTheSame() {
  const op1 = getRandomNumber(10, 100)
  const base = Math.floor(op1 * 0.1) * 10
  const op2 = base + (10 - (op1 - base))
  return {
    op1,
    op2,
    answer: op1 * op2
  }
}

function App() {
  const categories = [
    squaringOfNumbersBetween50And60,
    multiplicationWithASeriesOf1s,
    multiplicationOfNumbersWhoseLastDigitsAddTo10AndTheRemainingDigitsAreTheSame
  ]
  const f = categories[Math.floor(Math.random() * categories.length)]
  const { op1, op2, answer, fromRight = false } = f()

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Multiplication op1={op1} op2={op2} />
          <UserInput answer={answer} fromRight={fromRight} />
        </div>
      </div>
    </div>
  )
}

export default App
