const dates = require("date-fns/locale");
const { bg, ro, enGB } = dates;

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
const removeSpaces = (string) => {
  return string.split(" ").join("");
};

const validateNumbersInput = (e) => {
  const keyCodeArray = [46, 8, 9, 27, 13, 110, 190, 37, 39];
  if (keyCodeArray.indexOf(e.keyCode) !== -1) {
    return;
  }
  if (
    (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
    (e.keyCode < 96 || e.keyCode > 105)
  ) {
    e.preventDefault();
  }
};

const linkUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.REACT_APP_DEVELOPMENT_API_URL;
  } else {
    return process.env.REACT_APP_PRODUCTION_API_URL;
  }
};

const endpoints = {
  truckCoversPricesUrl: "/api/price/truckcovers-prices",
  truckCoversEditPricesUrl: "/api/price/truckcovers-prices/edit",
  truckGondolaPricesUrl: "/api/price/truck-gondola-prices",
  truckGondolaEditPricesUrl: "/api/price/truck-gondola-prices/edit",
  truckWithShutterPriceUrl: "/api/price/truck-with-shutter-price",
  truckWithShutterEditPriceUrl: "/api/price/truck-with-shutter-price/edit",
  truckWithoutShutterPriceUrl: "/api/price/truck-without-shutter-price",
  truckWithoutShutterEditPriceUrl:
    "/api/price/truck-without-shutter-price/edit",
  truckGondolaPriceUrl: "/api/trucks/truckcovers-gondola-priceoffer",
  truckShutterPriceUrl: "/api/trucks/truckcovers-shutter-priceoffer",
  truckFileUrl: "/api/trucks/truckcovers-offer-file",
  truckComparedFilesUrl: "/api/trucks/truckcovers-offer-file-edit",
  truckSendEmailUrl: "/api/trucks/truckcovers-offer-email",
  windproofPricesUrl: "/api/price/windproofcurtains-prices",
  windProofEditPricesUrl: "/api/price/windproofcurtains-prices/edit",
  windproofPriceUrl: "/api/windproofcurtains/windproofcurtains-priceoffer",
  windproofFileUrl: "/api/windproofcurtains/windproofcurtains-offer-file",
  windproofComparedFilesUrl:
    "/api/windproofcurtains/windproofcurtains-offer-file-edit",
  windproofSendEmailUrl: "/api/windproofcurtains/windproofcurtains-offer-email",
  verifyTokenUrl: "/api/verify-token",
  contactUrl: "/api/contact",
  login: "/api/auth/login",
  refresh: "/api/auth/refresh",
  logout: "/api/auth/logout",
};

const getLocale = (localLang) => {
  if (localLang === "bg") {
    return bg;
  } else if (localLang === "ro") {
    return ro;
  } else {
    return enGB;
  }
};

const getDateLocale = (item) => {
  if (item === "bg") {
    return "bg-BG";
  } else if (item === "ro") {
    return "ro-RO";
  } else {
    return "en-GB";
  }
};

/* axios library problem */
// const privateAxios = axios.create({
//   baseURL:
//     process.env.NODE_ENV === "production"
//       ? process.env.REACT_APP_PRODUCTION_API_URL
//       : process.env.REACT_APP_DEVELOPMENT_API_URL,
//   timeout: 20000,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
//   responseType: "json",
// });

module.exports = {
  scrollToTop,
  removeSpaces,
  linkUrl,
  endpoints,
  getLocale,
  getDateLocale,
  validateNumbersInput,
  // privateAxios
};
