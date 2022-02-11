import { useEffect, useRef, useState } from 'react' 

function Answer({ value, fromLeft = true, fromRight = false }) {
  const numDigits = String(value).length
  const [isCorrect, setIsCorrect] = useState(false)
  const [solution, setSolution] = useState(Array(numDigits).fill(''))
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
    setIsCorrect(String(value) === solution.join(''))
  }, [value, solution])

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
    <div className="solution">
      <div className="inputs mb-3">
        {solution.map((value, index) => (
        <input
          ref={el => inputRefs.current[index] = el}
          key={index}
          value={value || ''}
          onChange={e => handleInputChange(e, index)}
        /> 
        ))}
      </div>
      {isCorrect && <h5>👏 You got it!</h5>}
    </div>
  )
}

export default Answer 
