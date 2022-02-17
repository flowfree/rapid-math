function Multiplication({ op1, op2 }) {
  return (
    <div className="row operation">
      <div className="col-12">
        <p className="my-5">
          {op1} &times; {op2}
        </p>
      </div>
    </div>
  )
}

export default Multiplication