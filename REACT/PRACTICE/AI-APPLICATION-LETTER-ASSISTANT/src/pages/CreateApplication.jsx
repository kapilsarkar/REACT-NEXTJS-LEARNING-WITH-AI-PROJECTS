import { useState } from "react";

const categories = [
  {
    id: "education",
    name: "Education",
    description: "School, college, certificates, and academic requests",
    documentTypes: [
      {
        id: "edu-leave-application",
        name: "Leave Application",
        description: "Request temporary absence from classes or school",
        fields: [
          { id: "studentName", label: "Student Name" },
          { id: "rollNumber", label: "Roll / Registration Number" },
          { id: "startDate", label: "Start Date", type: "date" },
          { id: "endDate", label: "End Date", type: "date" },
          { id: "reason", label: "Reason for Leave", type: "textarea" },
        ],
      },
      {
        id: "edu-scholarship-application",
        name: "Scholarship Application",
        description: "Apply for financial aid or merit assistance",
        fields: [
          { id: "studentName", label: "Applicant Name" },
          { id: "courseName", label: "Course / Class" },
          { id: "annualIncome", label: "Annual Family Income" },
          { id: "previousMarks", label: "Previous Year Percentage / GPA" },
          { id: "justification", label: "Why You Need This Scholarship", type: "textarea" },
        ],
      },
      {
        id: "edu-transfer-certificate",
        name: "Transfer Certificate (TC) Request",
        description: "Formal document required when moving institutions",
        fields: [
          { id: "studentName", label: "Student Name" },
          { id: "admissionNumber", label: "Admission Number" },
          { id: "lastClassPassed", label: "Last Class Passed" },
          { id: "reasonForLeaving", label: "Reason for Relocation / Leaving", type: "textarea" },
        ],
      },
      {
        id: "edu-fee-concession",
        name: "Fee Concession Request",
        description: "Request tuition fee adjustment or waiver",
        fields: [
          { id: "studentName", label: "Student Name" },
          { id: "rollNumber", label: "Roll Number" },
          { id: "parentOccupation", label: "Parent / Guardian Occupation" },
          { id: "concessionReason", label: "Reason for Request", type: "textarea" },
        ],
      },
      {
        id: "edu-bonafide-certificate",
        name: "Character / Bonafide Certificate",
        description: "Proof of enrollment for external verification",
        fields: [
          { id: "studentName", label: "Student Name" },
          { id: "enrollmentNumber", label: "Enrollment Number" },
          { id: "purpose", label: "Purpose of Certificate (e.g. Visa, Internship)" },
        ],
      },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Medical records, claims, leaves, and appointments",
    documentTypes: [
      {
        id: "health-medical-leave",
        name: "Medical Leave Certificate Request",
        description: "Formal doctor recommendation for sick leave",
        fields: [
          { id: "patientName", label: "Patient Full Name" },
          { id: "doctorName", label: "Treating Doctor" },
          { id: "startDate", label: "Leave Start Date", type: "date" },
          { id: "endDate", label: "Leave End Date", type: "date" },
          { id: "diagnosis", label: "Condition / Diagnosis Summary", type: "textarea" },
        ],
      },
      {
        id: "health-insurance-claim",
        name: "Health Insurance Claim Request",
        description: "Initiate reimbursement or cashless claim paperwork",
        fields: [
          { id: "policyNumber", label: "Policy Number" },
          { id: "patientName", label: "Patient Name" },
          { id: "hospitalName", label: "Hospital Name" },
          { id: "claimAmount", label: "Estimated Claim Amount" },
          { id: "admissionDate", label: "Admission Date", type: "date" },
        ],
      },
      {
        id: "health-medical-records",
        name: "Medical Records / Discharge Summary Request",
        description: "Obtain clinical case files and test histories",
        fields: [
          { id: "patientId", label: "Patient / UHID Number" },
          { id: "treatmentPeriod", label: "Period of Hospitalization" },
          { id: "requiredDocuments", label: "Specific Documents Needed (e.g. Lab reports, Bills)" },
        ],
      },
      {
        id: "health-reschedule-appointment",
        name: "Doctor Appointment Rescheduling",
        description: "Move an upcoming consultation to a different slot",
        fields: [
          { id: "patientName", label: "Patient Name" },
          { id: "currentBookingId", label: "Current Booking / Token ID" },
          { id: "preferredDate", label: "Preferred New Date", type: "date" },
          { id: "reason", label: "Reason for Rescheduling", optional: true },
        ],
      },
    ],
  },
  {
    id: "banking",
    name: "Banking",
    description: "Account modifications, cards, cheques, and closures",
    documentTypes: [
      {
        id: "bank-mobile-update",
        name: "Mobile Number Update",
        description: "Link a new mobile number to your bank account",
        fields: [
          { id: "accountHolder", label: "Account Holder Name" },
          { id: "accountNumber", label: "Account Number" },
          { id: "oldMobile", label: "Registered Mobile Number", type: "tel" },
          { id: "newMobile", label: "New Mobile Number", type: "tel" },
        ],
      },
      {
        id: "bank-address-change",
        name: "Address Change Request",
        description: "Update official residential or communication address",
        fields: [
          { id: "accountHolder", label: "Account Holder Name" },
          { id: "accountNumber", label: "Account Number" },
          { id: "newAddress", label: "New Residential Address", type: "textarea" },
          { id: "proofType", label: "Proof Document Submitted (e.g. Utility Bill)" },
        ],
      },
      {
        id: "bank-card-reissue",
        name: "ATM / Debit Card Block & Reissue",
        description: "Replace a stolen, lost, or malfunctioning card",
        fields: [
          { id: "accountNumber", label: "Account Number" },
          { id: "cardLast4", label: "Last 4 Digits of Lost/Damaged Card" },
          { id: "incidentReason", label: "Reason (Lost, Stolen, Expired, Damaged)" },
        ],
      },
      {
        id: "bank-cheque-book",
        name: "Cheque Book Request",
        description: "Order a fresh personalized cheque leaf booklet",
        fields: [
          { id: "accountNumber", label: "Account Number" },
          { id: "leavesCount", label: "Number of Cheque Leaves (e.g. 25, 50, 100)" },
          { id: "deliveryOption", label: "Delivery Mode (Branch Pickup / Postal)" },
        ],
      },
      {
        id: "bank-account-closure",
        name: "Account Closure Request",
        description: "Permanently close account and remit final balance",
        fields: [
          { id: "accountHolder", label: "Account Holder Name" },
          { id: "accountNumber", label: "Account Number" },
          { id: "balanceTransferAccount", label: "Account for Remaining Balance Transfer" },
          { id: "closureReason", label: "Reason for Closing Account", type: "textarea" },
        ],
      },
    ],
  },
  {
    id: "government-official",
    name: "Government / Official",
    description: "Certificates, RTI applications, and identity modifications",
    documentTypes: [
      {
        id: "gov-income-certificate",
        name: "Income Certificate Application",
        description: "Official revenue department proof of annual earnings",
        fields: [
          { id: "applicantName", label: "Applicant Name" },
          { id: "parentOrSpouse", label: "Father / Spouse Name" },
          { id: "annualIncome", label: "Declared Annual Income" },
          { id: "occupation", label: "Primary Occupation / Source of Income" },
        ],
      },
      {
        id: "gov-domicile-certificate",
        name: "Caste / Domicile Certificate",
        description: "Proof of state permanent residency or lineage",
        fields: [
          { id: "applicantName", label: "Applicant Name" },
          { id: "permanentAddress", label: "Permanent Address", type: "textarea" },
          { id: "yearsOfResidency", label: "Number of Years Residing at Address" },
        ],
      },
      {
        id: "gov-rti-application",
        name: "RTI (Right to Information) Application",
        description: "Formal information request under the RTI act",
        fields: [
          { id: "applicantName", label: "Applicant Name" },
          { id: "departmentName", label: "Public Authority / Department Name" },
          { id: "requestedInfo", label: "Information Sought (Specific Details)", type: "textarea" },
          { id: "timePeriod", label: "Relevant Time Period (e.g. 2024-2025)" },
        ],
      },
      {
        id: "gov-id-correction",
        name: "Official ID Correction Request",
        description: "Rectify errors on Voter ID, Domicile, or State Cards",
        fields: [
          { id: "currentIdRef", label: "Existing ID / Enrollment Number" },
          { id: "incorrectField", label: "Field Requiring Correction (Name, DOB, Address)" },
          { id: "correctedValue", label: "Corrected Value as per Proof" },
        ],
      },
    ],
  },
  {
    id: "workplace",
    name: "Workplace",
    description: "Leaves, resignations, letters, and HR requirements",
    documentTypes: [
      {
        id: "work-leave-request",
        name: "Casual / Sick Leave Request",
        description: "Apply for planned or unplanned workplace leave",
        fields: [
          { id: "employeeId", label: "Employee ID" },
          { id: "leaveType", label: "Leave Type (Casual, Sick, Earned)" },
          { id: "startDate", label: "Start Date", type: "date" },
          { id: "endDate", label: "End Date", type: "date" },
          { id: "handoverTo", label: "Work Handover Colleague", optional: true },
        ],
      },
      {
        id: "work-resignation-letter",
        name: "Resignation Letter",
        description: "Formal notification of departure and notice period",
        fields: [
          { id: "employeeName", label: "Employee Name" },
          { id: "employeeId", label: "Employee ID" },
          { id: "lastWorkingDay", label: "Requested Last Working Day", type: "date" },
          { id: "resignationNote", label: "Brief Reason / Note", type: "textarea", optional: true },
        ],
      },
      {
        id: "work-experience-certificate",
        name: "Experience / Relieving Certificate Request",
        description: "Request official service documentation upon exit",
        fields: [
          { id: "employeeId", label: "Employee ID" },
          { id: "designation", label: "Last Designation Held" },
          { id: "employmentTenure", label: "Tenure (e.g. Jan 2023 - Dec 2025)" },
        ],
      },
      {
        id: "work-salary-slip",
        name: "Salary Slip / Tax Statement Request",
        description: "Copies of payment advice or annual tax certificates",
        fields: [
          { id: "employeeId", label: "Employee ID" },
          { id: "monthsRequired", label: "Months / Financial Year Needed" },
          { id: "deliveryEmail", label: "Delivery Work Email", type: "email" },
        ],
      },
      {
        id: "work-wfh-request",
        name: "Work From Home (WFH) Request",
        description: "Request authorization to work off-site",
        fields: [
          { id: "startDate", label: "WFH Start Date", type: "date" },
          { id: "endDate", label: "WFH End Date", type: "date" },
          { id: "reason", label: "Reason for Remote Request", type: "textarea" },
        ],
      },
    ],
  },
  {
    id: "complaint-request",
    name: "Complaint / Request",
    description: "Lost items, consumer disputes, and utility complaints",
    documentTypes: [
      {
        id: "comp-police-report",
        name: "Police Complaint (Lost Item / General GD)",
        description: "Report missing documents, electronics, or personal articles",
        fields: [
          { id: "complainantName", label: "Complainant Name" },
          { id: "itemLost", label: "Item / Document Lost (e.g. Wallet, Certificate)" },
          { id: "incidentDate", label: "Date & Time of Incident", type: "date" },
          { id: "incidentLocation", label: "Approximate Location" },
          { id: "incidentDetails", label: "Description of Event", type: "textarea" },
        ],
      },
      {
        id: "comp-civic-issue",
        name: "Municipal Civic Issue (Garbage, Road, Drainage)",
        description: "Lodge public sanitation and utility infrastructure complaints",
        fields: [
          { id: "locality", label: "Ward / Street / Area" },
          { id: "issueCategory", label: "Category (Road, Sewage, Sanitation, Streetlight)" },
          { id: "description", label: "Problem Description", type: "textarea" },
        ],
      },
      {
        id: "comp-consumer-dispute",
        name: "Consumer Complaint / Defective Product",
        description: "Demand replacement or refund for faulty goods/services",
        fields: [
          { id: "sellerName", label: "Seller / Company Name" },
          { id: "orderOrInvoiceId", label: "Invoice / Order ID" },
          { id: "productName", label: "Product or Service Name" },
          { id: "issueSummary", label: "Defect or Grievance Details", type: "textarea" },
        ],
      },
      {
        id: "comp-utility-service",
        name: "Electricity / Water Supply Complaint",
        description: "Report erratic voltage, contamination, or billing flaws",
        fields: [
          { id: "consumerNumber", label: "Consumer / Meter Number" },
          { id: "serviceAddress", label: "Service Address", type: "textarea" },
          { id: "natureOfFault", label: "Nature of Fault (No supply, Billing error, Leakage)" },
        ],
      },
    ],
  },
  {
    id: "housing-society",
    name: "Housing / Society",
    description: "Residential NOCs, repairs, disputes, and parking slots",
    documentTypes: [
      {
        id: "house-noc-request",
        name: "NOC Request (Tenant / Renovation)",
        description: "Managing committee permission for modifications or move-in",
        fields: [
          { id: "flatNumber", label: "Flat / Unit Number" },
          { id: "nocType", label: "NOC Purpose (Tenant move-in, Interior renovation)" },
          { id: "durationOrStartDate", label: "Start Date or Proposed Period", type: "date" },
        ],
      },
      {
        id: "house-maintenance-repair",
        name: "Maintenance & Repair Request",
        description: "Report building common-area faults or urgent plumbing issues",
        fields: [
          { id: "flatNumber", label: "Flat Number" },
          { id: "repairType", label: "Repair Type (Plumbing, Electrical, Seepage)" },
          { id: "details", label: "Details of Issue", type: "textarea" },
        ],
      },
      {
        id: "house-parking-allocation",
        name: "Parking Space Allocation Request",
        description: "Register a newly acquired car or bike for parking slots",
        fields: [
          { id: "flatNumber", label: "Flat Number" },
          { id: "vehicleType", label: "Vehicle Type (2-Wheeler / 4-Wheeler)" },
          { id: "vehicleRegNumber", label: "Vehicle Registration Number" },
        ],
      },
      {
        id: "house-noise-complaint",
        name: "Complaint Against Disturbance / Noise",
        description: "Report violations of community quiet hours",
        fields: [
          { id: "targetUnit", label: "Unit Causing Disturbance (if known)", optional: true },
          { id: "disturbanceType", label: "Type of Disturbance (Construction, Loud music)" },
          { id: "dateTimeDetails", label: "Dates / Times of Recurring Disturbance" },
        ],
      },
    ],
  },
  {
    id: "general-letter",
    name: "General Letter",
    description: "Formal correspondence, apologies, notices, and permissions",
    documentTypes: [
      {
        id: "gen-formal-request",
        name: "Formal Request Letter",
        description: "Generic professional enquiry or petition",
        fields: [
          { id: "recipientTitle", label: "Recipient Title / Designation" },
          { id: "organization", label: "Recipient Organization" },
          { id: "subject", label: "Subject Line" },
          { id: "body", label: "Request Details", type: "textarea" },
        ],
      },
      {
        id: "gen-permission-letter",
        name: "Permission Letter",
        description: "Formal request to conduct activities or reserve venues",
        fields: [
          { id: "authorityName", label: "To (Authority Name/Designation)" },
          { id: "permissionFor", label: "Activity Requiring Permission" },
          { id: "eventDate", label: "Date of Activity / Event", type: "date" },
          { id: "explanation", label: "Details / Precautions Taken", type: "textarea" },
        ],
      },
      {
        id: "gen-apology-letter",
        name: "Apology Letter",
        description: "Official acknowledgement and regret for an incident",
        fields: [
          { id: "recipientName", label: "Recipient Name" },
          { id: "incidentReference", label: "Incident / Reference Subject" },
          { id: "explanation", label: "Explanation & Rectification Plan", type: "textarea" },
        ],
      },
      {
        id: "gen-formal-invitation",
        name: "Invitation / Formal Notice",
        description: "Official memo or gathering announcement",
        fields: [
          { id: "eventName", label: "Event / Occasion Name" },
          { id: "eventDate", label: "Event Date", type: "date" },
          { id: "venue", label: "Venue Address" },
          { id: "specialInstructions", label: "Additional Instructions / RSVP", optional: true },
        ],
      },
    ],
  },
];

const CreateApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState("Professional");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedDocumentType(null);
    setFormData({});
    setCurrentStep(2);
  };

  const handleDocumentTypeSelect = (doc) => {
    setSelectedDocumentType(doc);
    setFormData({});
    setCurrentStep(3);
  };

  const goToStep = (stepNumber) => {
    if (stepNumber === 1) {
      setSelectedCategory(null);
      setSelectedDocumentType(null);
      setFormData({});
      setCurrentStep(1);
    } else if (stepNumber === 2) {
      setSelectedDocumentType(null);
      setFormData({});
      setCurrentStep(2);
    }
  };

  const handleInputChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Application:", {
      categoryId: selectedCategory?.id,
      categoryName: selectedCategory?.name,
      documentTypeId: selectedDocumentType?.id,
      documentTypeName: selectedDocumentType?.name,
      language,
      tone,
      fields: formData,
    });
    alert("Application submitted successfully! Check the console for the complete payload.");
  };

  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-white p-6">
      {/* Stepper Header */}
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-extrabold tracking-tight text-slate-950">
          Application Generator
        </h1>

        <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
          <div
            onClick={() => goToStep(1)}
            className={`cursor-pointer pb-2 border-b-2 transition ${
              currentStep === 1
                ? "border-emerald-700 text-emerald-800 font-bold"
                : currentStep > 1
                ? "border-emerald-700 text-slate-700"
                : "border-slate-200 text-slate-400"
            }`}
          >
            1. Select Category
          </div>
          <div
            onClick={() => selectedCategory && goToStep(2)}
            className={`pb-2 border-b-2 transition ${
              currentStep === 2
                ? "border-emerald-700 text-emerald-800 font-bold"
                : currentStep > 2
                ? "border-emerald-700 text-slate-700 cursor-pointer"
                : "border-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            2. Choose Document
          </div>
          <div
            className={`pb-2 border-b-2 transition ${
              currentStep === 3
                ? "border-emerald-700 text-emerald-800 font-bold"
                : "border-slate-200 text-slate-400"
            }`}
          >
            3. Fill Questions
          </div>
        </div>

        {/* Dynamic Breadcrumbs */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <span
            className={currentStep > 1 ? "cursor-pointer font-medium text-emerald-700 hover:underline" : ""}
            onClick={() => goToStep(1)}
          >
            Categories
          </span>
          {selectedCategory && (
            <>
              <span>/</span>
              <span
                className={currentStep > 2 ? "cursor-pointer font-medium text-emerald-700 hover:underline" : "font-semibold text-slate-800"}
                onClick={() => goToStep(2)}
              >
                {selectedCategory.name}
              </span>
            </>
          )}
          {selectedDocumentType && (
            <>
              <span>/</span>
              <span className="font-semibold text-slate-800">
                {selectedDocumentType.name}
              </span>
            </>
          )}
        </div>
      </div>

      {/* STEP 1: CHOOSE CATEGORY */}
      {currentStep === 1 && (
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
              Choose a category
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Select the sector or authority for your application.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm shadow-slate-200/40 transition duration-200 hover:border-emerald-300 hover:bg-emerald-50/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                <div className="font-bold text-slate-900 transition-colors group-hover:text-emerald-900">
                  {cat.name}
                </div>
                <div className="mt-1 text-sm leading-5 text-slate-600">
                  {cat.description}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* STEP 2: CHOOSE DOCUMENT TYPE */}
      {currentStep === 2 && selectedCategory && (
        <section className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
                Choose a document type
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Available options for{" "}
                <span className="font-semibold text-slate-800">{selectedCategory.name}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="inline-flex w-fit items-center rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              ← Back to Categories
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-1">
            {selectedCategory.documentTypes.map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => handleDocumentTypeSelect(doc)}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm shadow-slate-200/40 transition duration-200 hover:border-emerald-300 hover:bg-emerald-50/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                <div>
                  <div className="font-bold text-slate-900 transition-colors group-hover:text-emerald-900">
                    {doc.name}
                  </div>
                  <div className="mt-1 text-sm leading-5 text-slate-600">
                    {doc.description}
                  </div>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-base font-bold text-slate-500 transition-colors group-hover:bg-emerald-700 group-hover:text-white">
                  →
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* STEP 3: ANSWER QUESTIONS */}
      {currentStep === 3 && selectedDocumentType && (
        <section className="space-y-6">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-700">
                Add document details
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">
                {selectedDocumentType.name}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Category: <span className="font-medium text-slate-800">{selectedCategory?.name}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="inline-flex w-fit items-center rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              ← Change Document
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tone and Language Selection */}
            <div className="grid grid-cols-1 gap-5 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 sm:grid-cols-2 sm:p-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-800">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Bengali">Bengali</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-800">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                >
                  <option value="Professional">Professional</option>
                  <option value="Formal">Formal</option>
                  <option value="Polite">Polite</option>
                </select>
              </div>
            </div>

            {/* Dynamic Fields */}
            {selectedDocumentType.fields.map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-800">
                  {field.label}{" "}
                  {!field.optional ? (
                    <span className="text-rose-600">*</span>
                  ) : (
                    <span className="text-xs font-medium text-slate-400">(Optional)</span>
                  )}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    rows={3}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    value={formData[field.id] || ""}
                    required={!field.optional}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="min-h-28 w-full resize-y rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm leading-6 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    value={formData[field.id] || ""}
                    required={!field.optional}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                  />
                )}
              </div>
            ))}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                Back
              </button>
              <button
                type="submit"
                className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              >
                Generate Application
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};

export default CreateApplication;