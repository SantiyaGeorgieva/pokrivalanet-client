import { useState } from "react";
import { linkUrl } from "../utils";

export const useApiFetchOfferFile = () => {
  const [loadingOfferFile, setLoadingOfferFile] = useState(false);
  const [errorOfferFile, setErrorOfferFile] = useState(null);
  const [offerNumber, setOfferNumber] = useState("");
  const [offerFileSucceed, setOfferFileSucceed] = useState(false);

  const fetchOfferPriceFile = async (fileName, selectedFile, url) => {
    setLoadingOfferFile(true);
    try {
      const response = await fetch(`${linkUrl()}${url}`, {
        method: "POST",
        body: JSON.stringify({
          filename: fileName,
          type: selectedFile.type,
          size: selectedFile.size,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      //   if (!response.ok) throw new Error(response.statusTexty);
      const json = await response.json();
      console.log("json obekta", json.offerId)
      setOfferFileSucceed(true);
      setLoadingOfferFile(false);
      setErrorOfferFile(null);
      setOfferNumber(json.offerId);

    } catch (error) {
      setErrorOfferFile(`${error} Could not Fetch Data `);
      setLoadingOfferFile(false);

    }
  };

  return { loadingOfferFile, errorOfferFile, fetchOfferPriceFile, offerNumber, setOfferNumber, offerFileSucceed, setOfferFileSucceed };
};