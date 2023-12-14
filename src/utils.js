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
  truckPriceUrl: '/truckcovers-priceoffer',
  truckFileUrl: '/truckcovers-offer-file',
  truckComparedFilesUrl: '/truckcovers-offer-file-edit',
  truckSendEmailUrl: '/truckcovers-offer-email',
  windproofPriceUrl: '/windproofcurtains-priceoffer',
  windproofFileUrl: '/windproofcurtains-offer-file',
  windproofComparedFilesUrl: 'windproofcurtains-offer-file-edit`',
  windproofSendEmailUrl: '/windproofcurtains-offer-email'
};

const getLocale = (localLang) => {
  if (localLang === "bg") {
    return bg
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