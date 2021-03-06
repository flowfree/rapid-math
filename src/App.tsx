import { useState, useEffect } from 'react'
import Multiplication from "./components/Multiplication"
import Substraction from './components/Substraction'
import UserInput from "./components/UserInput"

function getRandomNumber(min?: number, max?: number): number {
  if (min === undefined || max === undefined) {
    return Math.random()
  } else {
    return Math.floor(Math.random() * (max - min)) + min
  }
}

type Operation = {
  op1: number,
  op2: number,
  operator: string
}

function squaringOfNumbersBetween50And60(): Operation {
  const op = getRandomNumber(50, 60)
  return {
    op1: op,
    op2: op,
    operator: '*'
  }
}

function multiplicationWithASeriesOf1s(): Operation {
  const op1 = getRandomNumber(10, 1000)
  const op2 = getRandomNumber(2, 4) === 2 ? 11 : 111
  return {
    op1,
    op2,
    operator: '*'
  }
}

function multiplicationOfNumbersWhoseLastDigitsAddTo10AndTheRemainingDigitsAreTheSame(): Operation {
  let op1
  do {
    op1 = getRandomNumber(10, 101)
  } while (op1 % 10 === 0)
  const base = Math.floor(op1 * 0.1) * 10
  const op2 = base + (10 - (op1 - base))
  return {
    op1,
    op2,
    operator: '*'
  }
}

function multiplicationOfArbitraryNumbers(): Operation {
  const ops = []
  for (let i = 0; i < 2; i++) {
    ops.push(getRandomNumber(10, 50))
  }
  return {
    op1: ops[0],
    op2: ops[1],
    operator: '*'
  }
}

function substractionFromPowerOf10(): Operation {
  const powerOfTen = [100, 1000, 10000]
  const op1 = powerOfTen[Math.floor(Math.random() * powerOfTen.length)]
  const op2 = getRandomNumber(10, op1) + parseFloat(getRandomNumber().toFixed(2))
  return {
    op1,
    op2,
    operator: '-'
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [operation, setOperation] = useState<Operation>({op1: 0, op2: 0, operator: ''})

  const categories = [
    squaringOfNumbersBetween50And60,
    multiplicationWithASeriesOf1s,
    multiplicationOfNumbersWhoseLastDigitsAddTo10AndTheRemainingDigitsAreTheSame,
    multiplicationOfArbitraryNumbers,
    substractionFromPowerOf10
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
  
  const { op1, op2, operator } = operation
  let answer = ''
  let opDisplay = <div>Loading...</div>

  if (operator === '*') {
    opDisplay = (<Multiplication op1={op1} op2={op2} />)
    answer = String(op1 * op2)
  } else if (operator === '-') {
    opDisplay = (<Substraction op1={op1} op2={op2} />)
    try {
      const numDecimals = String(op2).split('.')[1].length
      answer = (op1 - op2).toFixed(numDecimals)
    } catch(e) {
      answer = String(op1 - op2)
    }
  }

  return (
    <div className="container">
      <div className="rapid-math">
        <div className="row">
          <div className="col-12">
            <span className="badge bg-primary">Solve the operation below</span>
            {opDisplay}
            {answer && <UserInput answer={answer} onCompleted={handleOnCompleted} />}
          </div>
        </div>
      </div>
    </div>

  )
}

export default App
