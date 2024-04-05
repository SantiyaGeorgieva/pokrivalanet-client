import { t } from "i18next";
import { login, logout } from "../reducers/authSlice";
import { store } from "../store";
import { endpoints, linkUrl } from "../utils";

export const authService = {
  async login(userData, setMessage) {
    try {
      const response = await fetch(`${linkUrl()}${endpoints.login}`, {
        method: "POST",
        body: JSON.stringify({
          username: userData.username,
          password: userData.password,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        responseType: "json",
      })
        .then((response) => response.json())
        .then((responseData, error) => {
          if (responseData.status === "success" || responseData.ok) {
            store.dispatch(login(responseData));
            setMessage(t(responseData.statusText));
            localStorage.setItem("username", responseData.username);
            localStorage.setItem("expirationTime", responseData.expirationTime);
          } else {
            throw responseData;
          }
        });
        return response;
    } catch (error) {
      setMessage(t(error?.message));
      throw new Error(error);
    }
  },

  async logout(setMessage) {
    const response = await fetch(`${linkUrl()}${endpoints.logout}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      responseType: "json"
    })
    .then((response) => response.json())
    .then((responseData) => {
      store.dispatch(logout(responseData));
      setMessage(t(responseData.statusText));
      localStorage.clear();
    })
    .catch((error) => {
      throw new Error(error);
    });

    return response;
  },
};
