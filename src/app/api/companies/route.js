import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import Company from "../../models/company";


// GET all companies
export async function GET() {
  await connectDB();
  const companies = await Company.find({});
  return NextResponse.json(companies);
  
}

// POST a new company
export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newCompany = await Company.create(data);
  return NextResponse.json(newCompany, { status: 201 });
}

// DELETE a company
export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await Company.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted Successfully" }, { status: 200 });
}


//EDIT a company
export async function PUT(req) {
  await connectDB();
  const { id, ...data } = await req.json();
  const updatedCompany = await Company.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updatedCompany, { status: 200 });
}
