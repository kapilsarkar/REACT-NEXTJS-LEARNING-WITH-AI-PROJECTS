import { useFetch } from "../hooks/useFetch";

const Destination = () => {
  const { data, loading, error } = useFetch(
    "https://picsum.photos/v2/list?page=1&limit=10"
  );

  //console.log("Data Fetching From Custom Hook", data);

  if (loading) return <p>Loading Data...</p>;

  // Fix 1: Access error.message instead of rendering error object directly
  if (error) return <p>Error- {error.message || String(error)}</p>;

  return (
    <div className="p-4">
      <h1 className="text-white font-bold text-2xl mb-4">
        Famous Destination Page-Using Custom Hook (useFetch) and Tailwind CSS for Styling
      </h1>

      {/* Fix 2: Safe mapping using data?.map */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.map((img) => (
          <div key={img.id} className="border p-2 rounded">
            {/* Fix 3 & 4: Added alt attribute & image styling */}
            <img
              src={img?.download_url}
              alt={img?.author || "Destination"}
              className="w-full h-64 object-cover rounded"
            />
            <p className="mt-2 text-lg font-semibold">{img?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destination;