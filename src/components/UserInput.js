import { useEffect, useRef, useState } from 'react' 

function UserInput({ answer, onCompleted }) {
  const numDigits = String(answer).length
  const [isCorrect, setIsCorrect] = useState(false)
  const [userAnswer, setUserAnswer] = useState(Array(numDigits).fill(''))
  const inputRefs = useRef([])

  useEffect(() => {
    setIsCorrect(false)
    setUserAnswer(Array(numDigits).fill(''))
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

    if (index < numDigits - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  return (
    <div className="user-input">
      <div className="inputs">
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
      {isCorrect && <p className="mt-2 text-success">You got it!</p>}
    </div>
  )
}

export default UserInput 
