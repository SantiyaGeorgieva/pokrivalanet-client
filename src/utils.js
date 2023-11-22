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
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_PRODUCTION_DATABASE_URL;
  } else {
    return process.env.REACT_APP_DEVELOPMENT_DATABASE_URL;
  }
};

module.exports = { scrollToTop, removeSpaces, linkUrl }

