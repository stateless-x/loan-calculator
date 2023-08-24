"use client";
import { useState, useRef } from "react";
import { FormInput } from "../FormInput/page";
import axios from "axios";
import { formatNumberWithCommas } from "../../util/utility";
import { MortgageInputs } from "../../type.d";
import "../../styles/mortgage.sass";

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
      placeholder: "0",
      label: "วงเงินที่ขอกู้",
      refer: loanAmountRef,
      errorMessage: "This field must be numbers",
      required: true,
      pattern: "^[0-9.]*$",
    },
    {
      id: 2,
      name: "term",
      type: "text",
      placeholder: "0",
      label: "ระยะเวลาที่ต้องการผ่อนชำระ (ปี)",
      refer: termRef,
      errorMessage: "This field must be numbers",
      required: true,
      pattern: "^[0-9.]*$",
    },
    {
      id: 3,
      name: "interestRate",
      type: "text",
      label: "อัตราดอกเบี้ย (%)",
      refer: rateRef,
      errorMessage: "This field must be numbers",
      required: true,
      pattern: "^[0-9.]*$",
    },
  ];

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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
    <div className="mortgage-wrapper">
      <div className="calculator-wrapper">
        <div className="input-wrapper">
          <h1>โปรแกรมคำนวณสินเชื่อบ้าน</h1>
          <h2>ผ่อนบ้าน ผ่อนคอนโด ผ่อนอสังหาฯ</h2>
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button type="submit">คำนวณเงินกู้</button>
          </form>
        </div>
        <div className="result-wrapper">
          <span>
            ยอดผ่อนชำระต่อเดือน:
            <br /> <h3>{formatNumberWithCommas(monthlyPayment)}</h3>
          </span>
          <span>
            อัตราดอกเบี้ยที่ต้องชำระทั้งหมด:
            <br /> <h3>{formatNumberWithCommas(totalInterest)}</h3>
          </span>
          <span>
            ยอดที่ต้องชำระทั้งหมด:
            <br /> <h3>{formatNumberWithCommas(totalPayment)}</h3>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Mortgage;
