import Cookies from "js-cookie";
import { linkUrl } from "../utils";
import { fetchAPIRequestInterceptor } from "./fetchAPIRequestInterceptor";

export const fetchTruckPrices = async (url) => {
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
      const responseData = await response.json();
      return responseData;
      // setIsPending(false);
      // setIsError(false);
      // setPricedFetch(json.result);
      // setError(null);
    }
  } catch (error) {
    // setError(`${error} Could not Fetch Data `);
    // setIsError(true);
    // setIsPending(false);
  }
};
