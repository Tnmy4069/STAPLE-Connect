import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  website: String,
  linkedin: String,
  contactPerson: String,
  contactPhone: String,
  contactEmail: String,
  openings: String,
  remarks: String,
  stapleMember: String,
});

export default mongoose.models.Company || mongoose.model("Company", CompanySchema);
