import { useEffect, useState } from "react"

export const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed To fetch Data");
                const result = await response.json();
                setData(result);
                setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [url])
    return { data, loading, error }
}