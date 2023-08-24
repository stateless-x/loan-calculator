"use client";
import { useState, useRef } from "react";
import { FormInput } from "../FormInput/page";
import axios from "axios";
import { formatNumberWithCommas } from "../../util/utility";
import { MortgageInputs } from "../../type.d";

const Mortgage = () => {
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const loanAmountRef = useRef();
  const termRef = useRef();
  const rateRef = useRef();

  const [values, setValues] = useState<MortgageInputs>({
    loanAmount: "",
    term: "",
    interestRate: "",
  });

  const inputs = [
    {
      id: 1,
      name: "loanAmount",
      type: "text",
      placeholder: "loan amount",
      label: "loan amount",
      refer: loanAmountRef,
      errorMessage: "This field must be numbers",
      required: true,
      pattern: "^[0-9]*$",
    },
    {
      id: 2,
      name: "term",
      type: "text",
      placeholder: "term",
      label: "term",
      refer: termRef,
      errorMessage: "This field must be numbers",
      required: true,
      pattern: "^[0-9]*$",
    },
    {
      id: 3,
      name: "interestRate",
      type: "text",
      placeholder: "interest rate",
      label: "Interest Rate",
      refer: rateRef,
      errorMessage: "This field must be numbers",
      required: true,
      pattern: "^[0-9]*$",
    },
  ];

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/calculator/mortgage", values);
      setMonthlyPayment(res.data.monthlyPayment);
      setTotalInterest(res.data.totalInterest);
      setTotalPayment(res.data.totalPayment);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="result-wrapper">
        <span>Monthly Payment: {formatNumberWithCommas(monthlyPayment)}</span>
        <span>Total Interest: {formatNumberWithCommas(totalInterest)}</span>
        <span>Total Payment: {formatNumberWithCommas(totalPayment)}</span>
      </div>
      <div>
        <h1>Loan Calculator</h1>
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button type="submit">add</button>
        </form>
      </div>
    </div>
  );
};

export default Mortgage;
