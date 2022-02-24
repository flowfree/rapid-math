import React, { useEffect, useRef, useState } from 'react' 

interface UserInputProps {
  answer: string
  onCompleted(): void
}

function UserInput({ answer, onCompleted }: UserInputProps) {
  const numDigits = String(answer).length
  const [isCorrect, setIsCorrect] = useState(false)
  const [userAnswer, setUserAnswer] = useState(Array(numDigits).fill(''))
  const inputRefs = useRef<HTMLInputElement[]>([])

  useEffect(() => {
    setIsCorrect(false)
    const arr: string[] = []
    String(answer).split('').forEach((val, idx) => {
      arr[idx] = val === '.' ? val : ''
    }) 
    setUserAnswer(arr)
    inputRefs.current[0].focus()
  }, [answer])

  useEffect(() => {
    if (String(answer) === userAnswer.join('')) {
      setIsCorrect(true)
      onCompleted()
    }
  }, [answer, userAnswer])

  function handleInputChange(e: React.FormEvent, index: number) {
    const input = e.target as HTMLInputElement
    const value = input.value.split('').pop()
    if (value !== undefined && isNaN(Number(value))) {
      return
    }
    const arr = JSON.parse(JSON.stringify(userAnswer))
    arr[index] = value
    setUserAnswer(arr)

    if (userAnswer[index + 1] === '') {
      cursorToNextInput(index)
    } else if (userAnswer[index + 1] === '.') {
      cursorToNextInput(index+1)
    } else if (userAnswer[index - 1] === '') {
      cursorToPreviousInput(index)
    } else if (userAnswer[index - 1] === '.') {
      cursorToPreviousInput(index - 1)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    const rightMostIndex = numDigits - 1
    if (e.key === 'ArrowLeft') {
      cursorToPreviousInput(index)
    } else if (e.key === 'ArrowRight') {
      cursorToNextInput(index)
    } else if (e.key === 'Backspace') {
      e.preventDefault()
      const arr = JSON.parse(JSON.stringify(userAnswer))
      if (arr[index] !== '') {
        arr[index] = ''
        setUserAnswer(arr)
      } else {
        cursorToPreviousInput(index)
      }
    } else if (e.key === 'Escape') {
      const arr: string[] = []
      String(answer).split('').forEach((val, idx) => {
        arr[idx] = val === '.' ? val : ''
      }) 
      setUserAnswer(arr)
      cursorToPreviousInput(1)
    }
  }

  function cursorToPreviousInput(index: number) {
    while (index > 0) {
      index--
      if (inputRefs.current[index].disabled === false) {
        inputRefs.current[index].focus()
        break
      }
    }
  }

  function cursorToNextInput(index: number) {
    const rightMostIndex = numDigits - 1
    while (index < rightMostIndex) {
      index++
      if (inputRefs.current[index].disabled === false) {
        inputRefs.current[index].focus()
        break
      }
    } 
  }

  return (
    <div className="row">
      <div className="col-12">
        {userAnswer.map((value, index) => {
          const isDot = String(answer).indexOf('.') === index
          return (
            <input
              ref={el => inputRefs.current[index] = el as HTMLInputElement}
              key={index}
              value={isDot ? "." : (value || '')}
              disabled={isDot}
              className={"me-2 " + (isCorrect ? 'correct ' : '') + (isDot ? 'dot ' : '')}
              maxLength={1}
              onChange={e => handleInputChange(e, index)}
              onKeyDown={e => handleKeyDown(e, index)}
            /> 
          )
        })}
      </div>
    </div>
  )
}

export default UserInput 
