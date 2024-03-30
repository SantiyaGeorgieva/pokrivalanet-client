import { useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { fetchAPIRequestInterceptor } from "../services/fetchAPIRequestInterceptor";
import { linkUrl } from "../utils";

export const useApiFetchPrice = (url) => {
  const [pricedFetch, setPricedFetch] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  // const { user } = useSelector((state) => state.auth);

  const fetchPrice = async (url) => {
    console.log("url", url);
    setIsPending(true);
    setIsError(false);
    // console.log("document.cookie", document.cookie);
    // const token = user.token;

    try {
      // console.log("token", token);
      // console.log("user.token", user.token);
      const resInterceptor = await fetchAPIRequestInterceptor(
        `${linkUrl()}${url}`,
        // token,
        {}
      );

      if (resInterceptor.ok) {
        const response = await fetch(`${linkUrl()}${url}`, {
          method: "GET",
          cache: "no-cache",
          withCredentials: true,
          credentials: "include",
          redirect: "follow",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${Cookies.get("access_token")}`,
            Cookie: `access_token=${Cookies.get("access_token")}`,
            "X-CSRF-Token": `access_token=${Cookies.get("access_token")}`,
            // 'Set-Cookie': Cookies.get('access_token')
          },
          responseType: "json",
        });
        // Cookies.set('access_token', response.headers['x-access-token']);

        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        setIsPending(false);
        setIsError(false);
        setPricedFetch(json.result);
        setError(null);
      }
    } catch (error) {
      setError(`${error} Could not Fetch Data `);
      setIsError(true);
      setIsPending(false);
    }
  };

  return { pricedFetch, isPending, isError, error, fetchPrice, setPricedFetch };
};
