import { useEffect, useRef, useState } from 'react' 

function Answer({ value, fromLeft = true, fromRight = false }) {
  const numDigits = (new String(value)).length
  const [isCorrect, setIsCorrect] = useState(false)
  const [solution, setSolution] = useState(new Array(numDigits).fill(''))
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
  }, [numDigits])

  useEffect(() => {
    setIsCorrect(String(value) === solution.join(''))
  }, [solution])

  function handleInputChange(e, index) {
    const arr = JSON.parse(JSON.stringify(solution))
    arr[index] = e.target.value.split('').pop()
    setSolution(arr)

    if (fromLeft && index < numDigits) {
      inputRefs.current[index + 1].focus()
    } else if (fromRight && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  return (
    <div className="solution mt-3">
      <div className="inputs">
        {solution.map((value, index) => (
        <input
          ref={el => inputRefs.current[index] = el}
          key={index}
          value={value || ''}
          onChange={e => handleInputChange(e, index)}
        /> 
        ))}
      </div>
      {isCorrect && <p>👏 You got it!</p>}
    </div>
  )
}

export default Answer 
