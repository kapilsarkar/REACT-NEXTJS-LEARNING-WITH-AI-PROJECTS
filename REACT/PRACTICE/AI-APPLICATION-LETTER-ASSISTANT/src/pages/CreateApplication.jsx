import { useState } from "react";

const categories = [
  {
    id: 1,
    name: "Education",
    documentTypes: [
      { id: 1, name: "Leave Application" },
      { id: 2, name: "Scholarship Application" },
      { id: 3, name: "Transfer Certificate (TC) Request" },
      { id: 4, name: "Fee Concession Request" },
      { id: 5, name: "Character / Bonafide Certificate" },
    ],
  },
  {
    id: 2,
    name: "Healthcare",
    documentTypes: [
      { id: 1, name: "Medical Leave Certificate Request" },
      { id: 2, name: "Health Insurance Claim Request" },
      { id: 3, name: "Medical Records / Discharge Summary Request" },
      { id: 4, name: "Doctor Appointment Rescheduling" },
    ],
  },
  {
    id: 3,
    name: "Banking",
    documentTypes: [
      { id: 1, name: "Mobile Number Update" },
      { id: 2, name: "Address Change Request" },
      { id: 3, name: "ATM / Debit Card Block & Reissue" },
      { id: 4, name: "Cheque Book Request" },
      { id: 5, name: "Account Closure Request" },
    ],
  },
  {
    id: 4,
    name: "Government / Official",
    documentTypes: [
      { id: 1, name: "Income Certificate Application" },
      { id: 2, name: "Caste / Domicile Certificate" },
      { id: 3, name: "RTI (Right to Information) Application" },
      { id: 4, name: "Voter ID / Aadhaar Correction Request" },
    ],
  },
  {
    id: 5,
    name: "Workplace",
    documentTypes: [
      { id: 1, name: "Casual / Sick Leave Request" },
      { id: 2, name: "Resignation Letter" },
      { id: 3, name: "Experience / Relieving Certificate Request" },
      { id: 4, name: "Salary Slip / Form 16 Request" },
      { id: 5, name: "Work From Home (WFH) Request" },
    ],
  },
  {
    id: 6,
    name: "Complaint / Request",
    documentTypes: [
      { id: 1, name: "Police Complaint (Lost Item / General GD)" },
      { id: 2, name: "Municipal Civic Issue (Garbage, Road, Drainage)" },
      { id: 3, name: "Consumer Complaint / Defective Product" },
      { id: 4, name: "Electricity / Water Supply Complaint" },
    ],
  },
  {
    id: 7,
    name: "Housing / Society",
    documentTypes: [
      { id: 1, name: "NOC Request (Tenant / Renovation)" },
      { id: 2, name: "Maintenance & Repair Request" },
      { id: 3, name: "Parking Space Allocation Request" },
      { id: 4, name: "Complaint Against Disturbance / Noise" },
    ],
  },
  {
    id: 8,
    name: "General Letter",
    documentTypes: [
      { id: 1, name: "Formal Request Letter" },
      { id: 2, name: "Permission Letter" },
      { id: 3, name: "Apology Letter" },
      { id: 4, name: "Invitation / Formal Notice" },
    ],
  },
];

const CreateApplication = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (item) => {
    setSelectedCategory(item);
  };

  return (
    <div>
      <h2>Create Application</h2>
      <div>
        {categories.map((category) => (
          <button
            onClick={() => handleCategorySelect(category)}
            className="rounded-md border border-yellow-200 bg-green-700 px-2 py-3 text-white"
            key={category.id}
          >
            {category.name}
          </button>
        ))}
        <div>
          <h2 className="text-black">
            Selected Category :{" "}
            {selectedCategory ? selectedCategory.name : "None"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CreateApplication;
