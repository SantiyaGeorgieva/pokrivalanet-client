import { useState } from "react";
import { linkUrl } from "../utils";

export const useApiFetchPrice = () => {
  const [pricedFetch, setPricedFetch] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const fetchPrice = async (url) => {
    setIsPending(true);
    setIsError(false);

    try {
      const response = await fetch(`${linkUrl()}${url}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      setIsPending(false);
      setIsError(false);
      setPricedFetch(json.result);
      setError(null);
    } catch (error) {
      setError(`${error} Could not Fetch Data `);
      setIsError(true);
      setIsPending(false);
    }
  };

  return { pricedFetch, isPending, isError, error, fetchPrice, setPricedFetch };
};