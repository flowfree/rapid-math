import Multiplication from "./components/operations/Multiplication"
import Answer from "./components/Answer"

function App() {
  return (
    <div>
      <Multiplication op1={73} op2={11} />
      <Answer value={803} fromRight={true} />
    </div>
  )
}

export default App
