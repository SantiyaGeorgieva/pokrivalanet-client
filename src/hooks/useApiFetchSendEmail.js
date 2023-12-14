import { useState } from "react";
import { linkUrl } from "../utils";

export const useApiFetchSendEmail = () => {
  const [sendEmailLoading, setSendEmailLoading] = useState(false);
  const [errorSendEmail, setErrorSendEmail] = useState(false);
  const [sendEmailSucceed, setSendEmailSucceed] = useState(false);

  const fetchSendEmail = async (urlPdf, fileName, url) => {
    setSendEmailLoading(true);
    try {
      fetch(`${linkUrl()}${url}`, {
        method: "POST",
        body: JSON.stringify({ filename: fileName, file: urlPdf }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setSendEmailLoading(false);
      setErrorSendEmail(false);
      setSendEmailSucceed(true);
    } catch (error) {
      setErrorSendEmail(`${error} Could not Fetch Data `);
      setSendEmailLoading(false);
      setErrorSendEmail(true);
      setSendEmailSucceed(false);
    }
  };

  return { sendEmailLoading, errorSendEmail, fetchSendEmail, sendEmailSucceed };
};