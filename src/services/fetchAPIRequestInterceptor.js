export const fetchAPIRequestInterceptor = async (endPoint, token, config) => {
  const { fetch: originalFetch } = window;
  window.fetch = async (...args) => {
    //setting the api token for the header
    config.headers = config.headers || {};
    config.headers["Authorization"] = token;
    config.method = "GET";

    try {
      const response = await originalFetch(endPoint, config);
      console.log("response", response);
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
};
