function Multiplication({ op1, op2 }) {
  return (
    <div className="d-flex justify-content-center">
      <table className="operation">
        <tbody>
          <tr>
            <td></td>
            <td>{op1}</td>
          </tr>
          <tr className="border-bottom">
            <td className="operator">&times;</td>
            <td>{op2}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Multiplication