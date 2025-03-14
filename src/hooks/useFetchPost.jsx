import { useState } from "react";

const useFetchPost = (urlExtension, body) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = "9e6dffc9-8b8c-43d7-bd5a-d84d84a95aa1"; 

  const postData = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      for (const key in body) {
        if (Object.hasOwnProperty.call(body, key)) {
          formData.append(key, body[key]);
        }
      }

      const response = await fetch(
        `https://momentum.redberryinternship.ge/api/${urlExtension}`, 
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
          body: formData, 
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
