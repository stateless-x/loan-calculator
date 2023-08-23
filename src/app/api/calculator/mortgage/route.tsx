import { NextRequest, NextResponse } from "next/server";
import { Mortgage } from "../../../../type.d";
export async function POST(req: NextRequest) {
  const data: Mortgage = await req.json();
  // console.log(data);

  // Your processing here...
  const monthlyPayment = computeMonthlyPayment(data);
  // console.log("monthly payment", monthlyPayment);
  const totalPayment = monthlyPayment * data.term * 12;
  const totalInterest = totalPayment - data.loanAmount;
  return NextResponse.json({
    monthlyPayment: monthlyPayment.toFixed(2),
    totalPayment: totalPayment.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
  });
}

function computeMonthlyPayment(data: Mortgage): number {
  const monthlyRate: number = data.interestRate / 100 / 12;
  const numberOfPayments: number = data.term * 12;
  const denominator: number = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
  return (
    (data.loanAmount *
      monthlyRate *
      Math.pow(1 + monthlyRate, numberOfPayments)) /
    denominator
  );
}
