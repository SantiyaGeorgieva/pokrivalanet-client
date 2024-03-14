const dates = require("date-fns/locale");
const { bg, ro, enGB } = dates;

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
}
const removeSpaces = (string) => {
  return string.split(' ').join('');
}

const linkUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_DEVELOPMENT_API_URL;
  } else {
    return process.env.REACT_APP_PRODUCTION_API_URL;
  }
};

const endpoints = {
  truckPriceUrl: '/api/trucks/truckcovers-priceoffer',
  truckFileUrl: '/api/trucks/truckcovers-offer-file',
  truckComparedFilesUrl: '/api/trucks/truckcovers-offer-file-edit',
  truckSendEmailUrl: '/api/trucks/truckcovers-offer-email',
  windproofPriceUrl: '/api/windproofcurtains/windproofcurtains-priceoffer',
  windproofFileUrl: '/api/windproofcurtains/windproofcurtains-offer-file',
  windproofComparedFilesUrl: '/api/windproofcurtains/windproofcurtains-offer-file-edit',
  windproofSendEmailUrl: '/api/windproofcurtains/windproofcurtains-offer-email',
  verifyTokenUrl: '/api/verify-token',
  contactUrl: '/api/contact'
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

module.exports = { scrollToTop, removeSpaces, linkUrl, endpoints, getLocale, getDateLocale }