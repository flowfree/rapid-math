import OpMultiplication from "./components/OpMultiplication"
import Answer from "./components/Answer"

function App() {
  return (
    <div>
      <OpMultiplication op1={73} op2={11} />
      <Answer value={803} fromRight={true} />
    </div>
  )
}

export default App
