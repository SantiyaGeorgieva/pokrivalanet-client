import { useState } from "react";
import { linkUrl } from "../utils";

export const useApiFetchOfferPrice = () => {
  const [totalPrice, setTotalPrice] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [calulatedButtonClicked, setCalculatedButtonClicked] = useState(false);

  const fetchOfferPrice = async (values, titlePage, url) => {
    setIsPending(true);
    setCalculatedButtonClicked(true)
    try {
      const response = await fetch(`${linkUrl()}${url}`, {
        method: "POST",
        body: JSON.stringify({ values: values[0], title: titlePage }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      setIsPending(false);
      setTotalPrice(json.result);
      setError(null);

    } catch (error) {
      setError(`${error} Could not Fetch Data `);
      setIsPending(false);

    }
  };

  return { totalPrice, isPending, error, calulatedButtonClicked, fetchOfferPrice, setCalculatedButtonClicked, setTotalPrice };
};