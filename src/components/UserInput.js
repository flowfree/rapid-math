import { useEffect, useRef, useState } from 'react' 

function UserInput({ answer, fromLeft = true, fromRight = false }) {
  const numDigits = String(answer).length
  const [isCorrect, setIsCorrect] = useState(false)
  const [userAnswer, setUserAnswer] = useState(Array(numDigits).fill(''))
  const inputRefs = useRef([])

  if (fromRight) {
    fromLeft = !fromRight
  } else if (fromLeft) {
    fromRight = !fromLeft
  }

  useEffect(() => {
    if (fromLeft) {
      inputRefs.current[0].focus()
    } else {
      inputRefs.current[numDigits - 1].focus()
    }
  }, [numDigits, fromLeft])

  useEffect(() => {
    setIsCorrect(String(answer) === userAnswer.join(''))
  }, [answer, userAnswer])

  function handleInputChange(e, index) {
    const arr = JSON.parse(JSON.stringify(userAnswer))
    arr[index] = e.target.value.split('').pop()
    setUserAnswer(arr)

    if (fromLeft && index < numDigits) {
      inputRefs.current[index + 1].focus()
    } else if (fromRight && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  return (
    <div className="user-input">
      <div className="inputs mb-3">
        {userAnswer.map((value, index) => (
        <input
          ref={el => inputRefs.current[index] = el}
          key={index}
          value={value || ''}
          className="shadow-none"
          onChange={e => handleInputChange(e, index)}
        /> 
        ))}
      </div>
      {isCorrect && <h5>👏 You got it!</h5>}
    </div>
  )
}

export default UserInput 
