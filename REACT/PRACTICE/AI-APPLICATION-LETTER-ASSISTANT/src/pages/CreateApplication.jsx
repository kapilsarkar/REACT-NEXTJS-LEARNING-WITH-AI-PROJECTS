import { useState } from "react";

const categories = [
  {
    id: 1,
    name: "Education",
  },
  {
    id: 2,
    name: "Healthcare",
  },
  {
    id: 3,
    name: "Banking",
  },
  {
    id: 4,
    name: "Government/Official",
  },
  {
    id: 5,
    name: "Workplace",
  },
  {
    id: 6,
    name: "Complaint/Request",
  },
  {
    id: 7,
    name: "Housing/Society",
  },
  {
    id: 8,
    name: "General Letter",
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
            onClick={()=>handleCategorySelect(category)}
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
