function Multiplication({ op1, op2 }) {
  return (
    <div className="operation mb-3"> 
      <table className="border-bottom">
        <tbody>
          <tr>
            <td></td>
            <td>{op1}</td>
          </tr>
          <tr>
            <td><small>&times;</small>&nbsp;</td>
            <td>{op2}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Multiplication