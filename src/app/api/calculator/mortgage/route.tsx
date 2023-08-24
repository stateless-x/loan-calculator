import { NextRequest, NextResponse } from "next/server";
import { MortgageInputs } from "../../../../type.d";
export async function POST(req: NextRequest) {
  const data = await req.json();
  if (data) {
    if (
      typeof data.term !== "number" ||
      typeof data.interestRate !== "number" ||
      typeof data.loanAmount !== "number"
    ) {
      return NextResponse.json("Invalid inputs - Please use Numbers", { status: 400, statusText: "invalid URL" });
    }
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
