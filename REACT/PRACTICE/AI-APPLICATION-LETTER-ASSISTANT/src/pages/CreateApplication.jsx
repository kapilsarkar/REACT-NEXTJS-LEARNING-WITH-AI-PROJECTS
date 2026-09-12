import { useState } from "react";
import { categories } from "../constants/categories.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setLanguage,
  setTone,
  setSelectedCategory,
  setSelectedDocumentType,
  setFormField,
  resetToCategories,
  resetToDocumentTypes,
} from "../features/applicationSlice.js";

const CreateApplication = () => {
  // Step tracker remains local UI state
  const [currentStep, setCurrentStep] = useState(1);

  const dispatch = useDispatch();

  // All application data read directly from Redux
  const {
    language,
    tone,
    selectedCategory,
    selectedDocumentType,
    formData,
  } = useSelector((state) => state.application);

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));
    setCurrentStep(2);
  };

  const handleDocumentTypeSelect = (doc) => {
    dispatch(setSelectedDocumentType(doc));
    setCurrentStep(3);
  };

  const goToStep = (stepNumber) => {
    if (stepNumber === 1) {
      dispatch(resetToCategories());
      setCurrentStep(1);
    } else if (stepNumber === 2) {
      dispatch(resetToDocumentTypes());
      setCurrentStep(2);
    }
  };

  const handleInputChange = (fieldId, value) => {
    dispatch(setFormField({ fieldId, value }));
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
    alert(
      "Application submitted successfully! Check the console for the complete payload.",
    );
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
            className={
              currentStep > 1
                ? "cursor-pointer font-medium text-emerald-700 hover:underline"
                : ""
            }
            onClick={() => goToStep(1)}
          >
            Categories
          </span>
          {selectedCategory && (
            <>
              <span>/</span>
              <span
                className={
                  currentStep > 2
                    ? "cursor-pointer font-medium text-emerald-700 hover:underline"
                    : "font-semibold text-slate-800"
                }
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
                <span className="font-semibold text-slate-800">
                  {selectedCategory.name}
                </span>
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
                Category:{" "}
                <span className="font-medium text-slate-800">
                  {selectedCategory?.name}
                </span>
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
                <label className="text-sm font-bold text-slate-800">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => dispatch(setLanguage(e.target.value))}
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
                  onChange={(e) => dispatch(setTone(e.target.value))}
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
                    <span className="text-xs font-medium text-slate-400">
                      (Optional)
                    </span>
                  )}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    rows={3}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    value={formData[field.id] || ""}
                    required={!field.optional}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.value)
                    }
                    className="min-h-28 w-full resize-y rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm leading-6 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    value={formData[field.id] || ""}
                    required={!field.optional}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.value)
                    }
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