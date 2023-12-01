import './closeIcon.scss';

function CloseIcon({ text }) {
  return (
    <span className="close-icon close">
      <input type="checkbox" />
      <span></span>
      <span></span>
      <span></span>
    </span>
  )
}

export default CloseIcon;