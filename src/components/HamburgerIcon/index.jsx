import './hamburgerIcon.scss';

function HamburgerIcon({ text }) {
  return (
    <span className="hamburger-icon">
      <input type="checkbox" />
      <span></span>
      <span></span>
      <span></span>
    </span>
  )
}

export default HamburgerIcon;