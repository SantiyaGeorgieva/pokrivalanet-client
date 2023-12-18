import { useState } from "react";
import { linkUrl } from "../utils";

export const useApiFetchOfferComparedFiles = () => {
  const [loadingComparedFiles, setLoadingComparedFiles] = useState(false);
  const [errorComparedFiles, setErrorComparedFiles] = useState(false);
  const [comparedFilesSucceed, setComparedFilesSucceed] = useState(false);

  const fetchOfferComparedFiles = async (offerNumber, fileName, file, url) => {
    setLoadingComparedFiles(true);

    try {
      const response = await fetch(`${linkUrl()}${url}`, {
        method: "PUT",
        body: JSON.stringify({
          id: offerNumber,
          filename: fileName,
          type: file.type,
          size: file.size,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) throw new Error(response.statusText);
      setComparedFilesSucceed(true);
      setLoadingComparedFiles(false);
      setErrorComparedFiles(false);

    } catch (error) {
      setErrorComparedFiles(`${error} Could not Fetch Data `);
      setLoadingComparedFiles(false);
    }
  };

  return { loadingComparedFiles, errorComparedFiles, fetchOfferComparedFiles, comparedFilesSucceed };
};