import { useState } from "react";

const useFetchPost = (urlExtension, body) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = "9e6c7179-4fdc-47e2-bedf-6f3fa135713d"; // Or dynamically retrieve it if needed

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
