import { NextRequest, NextResponse } from "next/server";
import { MortgageInputs } from "../../../../type.d";
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (data) {
      const term = Number(data.term);
      const interestRate = Number(data.interestRate);
      const loanAmount = Number(data.loanAmount);
      if (isNaN(term) || isNaN(interestRate) || isNaN(loanAmount)) {
        return NextResponse.json("Please use numbers and ensure that all required fields sent.", {
          status: 400,
          statusText: "invalid inputs",
        });
      }
      const monthlyPayment = computeMonthlyPayment(data);
      const totalPayment = monthlyPayment * data.term * 12;
      const totalInterest = totalPayment - data.loanAmount;
      return NextResponse.json({
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
      });
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json("Malformed JSON", {
      status: 400,
      statusText: "Bad Request",
    });
  }
}

function computeMonthlyPayment(data: MortgageInputs): number {
  const monthlyRate: number = Number(data.interestRate) / 100 / 12;
  const numberOfPayments: number = Number(data.term) * 12;
  const denominator: number = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
  return (
    (Number(data.loanAmount) *
      monthlyRate *
      Math.pow(1 + monthlyRate, numberOfPayments)) /
    denominator
  );
}
