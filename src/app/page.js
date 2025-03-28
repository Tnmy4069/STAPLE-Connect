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
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const { data } = await axios.get("/api/companies");
    setCompanies(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (editingId) {
      await axios.put("/api/companies", { ...formData, id: editingId });
      setMessage("✅ Company Updated Successfully!");
    } else {
      await axios.post("/api/companies", formData);
      setMessage("✅ Company Added Successfully!");


    }


    setFormData({
      email: "", name: "", type: "", website: "",
      linkedin: "", contactPerson: "", contactPhone: "",
      contactEmail: "", openings: "", remarks: "", stapleMember: ""
    });

    setEditingId(null);
    fetchCompanies();
    setLoading(false);

    setTimeout(() => setMessage(""), 3000); // Clear message after 3s
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this company?")) {
      await axios.delete("/api/companies", { data: { id } });
      fetchCompanies();
      setMessage("❌ Company Deleted!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleEdit = (company) => {
    setFormData(company);
    setEditingId(company._id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll up when editing
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
    <h1 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
      STAPLE Industry Connect
    </h1>

  

    {message && (
      <p className="text-center bg-green-500 text-white py-2 px-4 rounded-lg shadow-md transition-all">
        {message}
      </p>
    )}

    {/* GLASSMORPHISM FORM */}
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-lg bg-white/10 p-8 rounded-xl shadow-lg border border-white/20 max-w-3xl w-full"
    >
      <h2 className="text-xl font-bold text-center mb-4">
        {editingId ? "✏️ Edit Company" : "➕ Add Company"}
      </h2>

      <p className="text-lg text-center mb-4 text-amber-500">Before adding check if company data is already added or not.. to avoid duplicate entries</p>

      <div className="grid grid-cols-2 gap-4">


        <input type="text" placeholder="Your Name (Staple Member)" className="glass-input col-span-2" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />


        <input type="text" placeholder="Company Name *" className="glass-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />



        <select className="glass-input" id="drop" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} required>
          <option value="">Select Type *</option>
          <option value="IT/Software/Computer">IT/Software/Computer</option>
          <option value="Robotics/Automation/CAD/MECHANICAL">Robotics/Automation/CAD/MECHANICAL</option>
          <option value="Civil and Allied">Civil and Allied</option>
          <option value="Other">Other</option>
        </select>



        <input type="text" placeholder="Company Website" className="glass-input " value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />

        
        <input type="text" placeholder="LinkedIn Link *" className="glass-input" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} required />


        <input type="text" placeholder="Contact Person (e.g. HR - Rakesh Patil)" className="glass-input col-span-2" value={formData.contactPerson} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })} />


        <input type="text" placeholder="Contact Person Phone *" className="glass-input" value={formData.contactPhone} onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })} required />


        <input type="email" placeholder="Contact Person Email" className="glass-input" value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} />


        <textarea placeholder="Present/Previous Openings" className="glass-input col-span-2" value={formData.openings} onChange={(e) => setFormData({ ...formData, openings: e.target.value })} />


        <textarea placeholder="Additional Remarks" className="glass-input col-span-2" value={formData.remarks} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} />


        <input type="hidden" placeholder="STAPLE Member Name" className="glass-input col-span-2" value={formData.stapleMember} onChange={(e) => setFormData({ ...formData, stapleMember: e.target.value })} />
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all"
      >
        {loading ? "Processing..." : editingId ? "Update Company" : "Submit"}
      </button>
    </form>

      {/* COMPANY LIST */}
      <div className="mt-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">📋 Company List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.map((c) => (
            <div key={c._id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-lg font-semibold mb-2">{c.name} - {c.type}</h3>
              <p className="text-sm text-gray-400">📧 {c.email}</p>
              {c.website && <p className="text-sm text-blue-400">🌍 <a href={c.website} target="_blank" rel="noopener noreferrer">{c.website}</a></p>}
              {c.linkedin && <p className="text-sm text-blue-400">🔗 <a href={c.linkedin} target="_blank" rel="noopener noreferrer">{c.linkedin}</a></p>}
              
              <p className="mt-2 text-sm"><strong>👤 Contact:</strong> {c.contactPerson}</p>
              <p className="text-sm"><strong>📞 Phone:</strong> {c.contactPhone}</p>
              <p className="text-sm"><strong>📧 Email:</strong> {c.contactEmail}</p>

              <p className="mt-2 text-sm"><strong>🔍 Openings:</strong> {c.openings || "N/A"}</p>
              <p className="text-sm"><strong>📝 Remarks:</strong> {c.remarks || "N/A"}</p>

              <div className="flex justify-between mt-4">
                <button onClick={() => handleEdit(c)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg">Edit</button>
                {/* <button onClick={() => handleDelete(c._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg">Delete</button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
