interface Props {
  op1: number
  op2: number
}

function Substraction({ op1, op2 }: Props) {
  let numDecimals
  try {
    numDecimals = String(op2).split('.')[1].length
  } catch(e) {
    numDecimals = 0
  }

  return (
    <div className="row operation">
      <div className="col-12">
        <p className="my-5">
          {op1} &minus; {op2}
        </p>
      </div>
    </div>
  )
}

export default Substraction
