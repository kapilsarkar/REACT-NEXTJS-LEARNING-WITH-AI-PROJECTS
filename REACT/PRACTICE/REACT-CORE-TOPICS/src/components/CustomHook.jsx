import { useFetch } from "../hooks/useFetch";

const CustomHook = () => {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/todos",
  );
  console.log("Data Fetching From Custom Hook", data);
  if (loading) return <p>Loading Data</p>;
  if (error) return <p>Error:- {error}</p>;

  return (
    <div>
      <h2>Custom Hooks: Fetch Data</h2>

      {data.map((list) => (
        <div key={list.id}>
          <p>Title :{list.title}</p>
          <p>User-Id{list.userId}</p>
          <p>Completed Status{list.completed ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
};
export default CustomHook;
