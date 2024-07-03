import { t } from "i18next";
import { login, logout } from "../reducers/authSlice";
import { store } from "../store";
import { endpoints, linkUrl } from "../utils";

export const authService = {
  async login(userData, setMessage, setError) {
    try {
      const response = await fetch(`${linkUrl()}${endpoints.login}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          password: userData.password,
        }),
      });
      const data = await response.json();

      if (data.status === "fail" || data.status === "error") {
        throw Error(data.message);
      } else {
        store.dispatch(login(data));
        console.log("data", data);
        setError(false);
        setMessage(t(data?.statusText));
        localStorage.setItem("username", data?.username);
        localStorage.setItem("expirationTime", data?.expirationTime);
        sessionStorage.setItem("jwt", data?.accessToken);
      }
    } catch (error) {
      setMessage(`${t(error?.message)}`);
      setError(true);
      throw Error(error);
    }
  },

  async logout(setMessage, setError) {
    try {
      const response = await fetch(`${linkUrl()}${endpoints.logout}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.status === "fail" || data.status === "error") {
        throw Error(data.message);
      } else {
        store.dispatch(logout(data));
        setMessage(t(data.statusText));
        localStorage.clear();
      }
    } catch (error) {
      setMessage(`${t(error?.message)}`);
      setError(true);
      throw Error(error);
    }
  },
};
