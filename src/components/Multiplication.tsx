interface Props {
  op1: number
  op2: number
}

function Multiplication({ op1, op2 }: Props) {
  return (
    <div className="row operation">
      <div className="col-12">
        <p className="my-3">
          {op1} &times; {op2}
        </p>
      </div>
    </div>
  )
}

export default Multiplication