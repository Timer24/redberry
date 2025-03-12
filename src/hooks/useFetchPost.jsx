import { useState } from "react";

const useFetchPost = (urlExtension, body) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = "9e6a1666-5977-4eef-a0ff-93d8223ce397";

  const postData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://momentum.redberryinternship.ge/api/${urlExtension}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post data.");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postData };
};

export default useFetchPost;
