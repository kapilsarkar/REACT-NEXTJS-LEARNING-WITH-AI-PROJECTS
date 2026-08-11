// hooks/useFetch.js
import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        
        // 🚨 Check if HTTP response status is ok (200-299)
        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const result = await res.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};