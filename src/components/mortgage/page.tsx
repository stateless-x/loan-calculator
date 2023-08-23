"use client";
import { useState } from "react";
import axios from "axios";
import {formatNumberWithCommas} from "../../util/utility"
const Mortgage = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [term, setTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(3);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      loanAmount: loanAmount,
      term: term,
      interestRate: interestRate,
    };
    try {
      const res = await axios.post("/api/calculator/mortgage", data);
      setMonthlyPayment(res.data.monthlyPayment);
      setTotalInterest(res.data.totalInterest);
      setTotalPayment(res.data.totalPayment);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Loan Amount:</label>
        <input
          type="text"
          name="amount"
          defaultValue={loanAmount}
          placeholder="amount"
          onChange={(e) => {
            setLoanAmount(Number(e.target.value));
          }}
        />
        <label htmlFor="term">Loan Term:</label>
        <input
          type="text"
          name="term"
          defaultValue={term}
          placeholder="term"
          onChange={(e) => {
            setTerm(Number(e.target.value));
          }}
        />
        <label htmlFor="rate">Rate:</label>
        <input
          type="text"
          name="rate"
          defaultValue={interestRate}
          placeholder="rate"
          onChange={(e) => setInterestRate(Number(e.target.value))}
        />
        <button type="submit">submit</button>
      </form>
      <div className="result-wrapper">
        <span>Monthly Payment: {formatNumberWithCommas(monthlyPayment)}</span>
        <span>Total Interest: {formatNumberWithCommas(totalInterest)}</span>
        <span>Total Payment: {formatNumberWithCommas(totalPayment)}</span>
      </div>
    </div>
  );
};

export default Mortgage;
