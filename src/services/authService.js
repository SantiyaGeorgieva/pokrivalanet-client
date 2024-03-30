import { login, logout } from "../reducers/authSlice";
import { store } from "../store";
import { endpoints, linkUrl } from "../utils";

export const authService = {
  async login(userData) {
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
        .then((responseData) => {
          if (responseData.status === "success") {
            // console.log("document.cookie", document.cookie);
            store.dispatch(login(responseData));
          }
          return responseData;
        });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },

  async logout() {
    const response = await fetch(`${linkUrl()}${endpoints.logout}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      responseType: "json",
    })
      .then((response) => response.json())
      .then((responseData) => {
        // window.browser.cookie.remove("access_token");
        store.dispatch(logout());
      })
      .catch((error) => {
        throw new Error(error);
      });

    return response;
  },
};
