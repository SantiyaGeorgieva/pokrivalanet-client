import './rectangle.scss';

function Rectangle({ text }) {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="gray-rectangle">
        <p className="mb-0">{text}</p>
      </div>
    </div>
  )
}

export default Rectangle;