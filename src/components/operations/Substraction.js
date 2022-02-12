function Substraction({ op1, op2 }) {
  let numDecimals
  try {
    numDecimals = String(op2).split('.')[1].length
  } catch(e) {
    numDecimals = 0
  }
  op1 = op1.toFixed(numDecimals)

  return (
    <div className="d-flex justify-content-center">
      <table className="operation">
        <tbody>
          <tr>
            <td></td>
            <td>{op1}</td>
          </tr>
          <tr className="border-bottom">
            <td className="operator">&minus;</td>
            <td>{op2}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Substraction
