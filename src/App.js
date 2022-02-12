import { useState, useEffect } from 'react'
import Multiplication from "./components/operations/Multiplication"
import UserInput from "./components/UserInput"

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
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
  const op1 = getRandomNumber(10, 1000)
  const op2 = getRandomNumber(2, 4) === 2 ? 11 : 111
  return {
    op1,
    op2,
    answer: op1 * op2
  }
}

function multiplicationOfNumbersWhoseLastDigitsAddTo10AndTheRemainingDigitsAreTheSame() {
  let op1
  do {
    op1 = getRandomNumber(10, 100)
  } while (op1 % 10 === 0)
  const base = Math.floor(op1 * 0.1) * 10
  const op2 = base + (10 - (op1 - base))
  return {
    op1,
    op2,
    answer: op1 * op2
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [operation, setOperation] = useState({})

  const categories = [
    squaringOfNumbersBetween50And60,
    multiplicationWithASeriesOf1s,
    multiplicationOfNumbersWhoseLastDigitsAddTo10AndTheRemainingDigitsAreTheSame
  ]

  useEffect(() => {
    const f = categories[Math.floor(Math.random() * categories.length)]
    setOperation(f())
  }, [count])

  function handleOnCompleted() {
    setTimeout(() => {
      setCount(count + 1)
    }, 1000)
  }

  const { op1, op2, answer } = operation

  if (op1 === undefined || answer === undefined) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <div className="row justify-content-center text-center">
        <div className="col-auto">
          <p className="my-3">
            Solve:
          </p>
          <Multiplication 
            op1={op1} 
            op2={op2} 
          />
          <p className="mt-4 mb-2">
            Answer:
          </p>
          <UserInput 
            answer={answer} 
            onCompleted={handleOnCompleted}
          />
        </div>
      </div>
    </div>
  )
}

export default App
