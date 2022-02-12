import { useEffect, useRef, useState } from 'react' 

function UserInput({ answer, onCompleted }) {
  const numDigits = String(answer).length
  const [isCorrect, setIsCorrect] = useState(false)
  const [userAnswer, setUserAnswer] = useState(Array(numDigits).fill(''))
  const inputRefs = useRef([])

  useEffect(() => {
    setIsCorrect(false)
    const arr = []
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

  function handleInputChange(e, index) {
    const arr = JSON.parse(JSON.stringify(userAnswer))
    arr[index] = e.target.value.split('').pop()
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

  function handleKeyDown(e, index) {
    const rightMostIndex = numDigits - 1
    if (e.key === 'ArrowLeft') {
      cursorToPreviousInput(index)
    } else if (e.key === 'ArrowRight') {
      cursorToNextInput(index)
    } else if (e.key === 'Backspace') {
      e.preventDefault()
      const arr = JSON.parse(JSON.stringify(userAnswer))
      arr[index] = ''
      setUserAnswer(arr)
      cursorToPreviousInput(index)
    } else if (e.key === 'Escape') {
      setUserAnswer(Array(numDigits).fill(''))
      cursorToPreviousInput(1)
    }
  }

  function cursorToPreviousInput(index) {
    while (index > 0) {
      index--
      if (inputRefs.current[index].disabled === false) {
        inputRefs.current[index].focus()
        break
      }
    }
  }

  function cursorToNextInput(index) {
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
    <div className="user-input">
      <div className="inputs">
        {userAnswer.map((value, index) => {
          const isDot = String(answer).indexOf('.') === index
          return (
            <input
              ref={el => inputRefs.current[index] = el}
              key={index}
              value={isDot ? "." : (value || '')}
              disabled={isDot}
              className="shadow-none"
              onChange={e => handleInputChange(e, index)}
              onKeyDown={e => handleKeyDown(e, index)}
            /> 
          )
        })}
      </div>
      {isCorrect && <p className="mt-2 text-success">You got it!</p>}
    </div>
  )
}

export default UserInput 
