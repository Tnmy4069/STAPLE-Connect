"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({
    email: "", name: "", type: "",
    website: "", linkedin: "", contactPerson: "",
    contactPhone: "", contactEmail: "", openings: "",
    remarks: "", stapleMember: "",
  });
  
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const { data } = await axios.get("/api/companies");
    setCompanies(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/companies", formData);
    setFormData({ email: "", name: "", type: "", website: "", linkedin: "", contactPerson: "", contactPhone: "", contactEmail: "", openings: "", remarks: "", stapleMember: "" });
    fetchCompanies();
  };

  const handleDelete = async (id) => {
    await axios.delete("/api/companies", { data: { id } });
    fetchCompanies();
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold text-center mb-6">STAPLE Industry Connect</h1>
  
      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md max-w-lg mx-auto">
        <input type="email" placeholder="Your Email *" className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
  
        <input type="text" placeholder="Company Name *" className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
  
        <select className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} required>
          <option value="">Select Type *</option>
          <option value="IT/Software/Computer">IT/Software/Computer</option>
          <option value="Robotics/Automation/CAD/MECHANICAL">Robotics/Automation/CAD/MECHANICAL</option>
          <option value="Civil and Allied">Civil and Allied</option>
          <option value="Other">Other</option>
        </select>
  
        <input type="text" placeholder="Company Website" className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
  
        <input type="text" placeholder="LinkedIn Link *" className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} required />
  
        <input type="text" placeholder="Contact Person (e.g. HR - Rakesh Patil)" className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white" value={formData.contactPerson} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })} />
  
        <input type="text" placeholder="Contact Person Phone *" className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white" value={formData.contactPhone} onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })} required />
  
        <input type="email" placeholder="Contact Person Email" className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white" value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} />
  
        <textarea type="text" placeholder="Present/Previous Openings" className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white" value={formData.openings} onChange={(e) => setFormData({ ...formData, openings: e.target.value })} />
  
        <textarea type="text" placeholder="Additional Remarks" className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white" value={formData.remarks} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} />
  
        <input type="text" placeholder="STAPLE Member Name" className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white" value={formData.stapleMember} onChange={(e) => setFormData({ ...formData, stapleMember: e.target.value })} />
  
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full">Submit</button>
      </form>
  
     {/* COMPANY LIST */}
<div className="mt-8 max-w-4xl mx-auto">
  <h2 className="text-xl font-bold mb-4">Company List</h2>
  <div className="max-h-[400px] overflow-auto space-y-4">
    {companies.map((c) => (
      <div key={c._id} className="bg-gray-800 p-4 rounded shadow">
        <p className="font-semibold text-lg">{c.name} - {c.type}</p>
        <p className="text-sm text-gray-400">📧 {c.email}</p>
        {c.website && <p className="text-sm text-blue-400">🌍 <a href={c.website} target="_blank" rel="noopener noreferrer">{c.website}</a></p>}
        {c.linkedin && <p className="text-sm text-blue-400">🔗 <a href={c.linkedin} target="_blank" rel="noopener noreferrer">{c.linkedin}</a></p>}
        
        <p className="mt-2 text-sm"><strong>Contact Person:</strong> {c.contactPerson}</p>
        <p className="text-sm"><strong>📞 Phone:</strong> {c.contactPhone}</p>
        <p className="text-sm"><strong>📧 Email:</strong> {c.contactEmail}</p>
        
        <p className="mt-2 text-sm"><strong>🔍 Openings:</strong> {c.openings || "N/A"}</p>
        <p className="text-sm"><strong>📝 Remarks:</strong> {c.remarks || "N/A"}</p>
        <p className="text-sm"><strong>👤 STAPLE Member:</strong> {c.stapleMember}</p>

        {/* <button onClick={() => handleDelete(c._id)} className="mt-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded w-full">Delete</button> */}
      </div>
    ))}
  </div>
</div>



    </div>
  );
  
}
