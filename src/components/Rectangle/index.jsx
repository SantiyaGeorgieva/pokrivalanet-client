import './rectangle.scss';

function Rectangle({ text, isMobile }) {
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <div className={`gray-rectangle ${isMobile ? 'small' : ''}`}>
        <p className="mb-0">{text}</p>
      </div>
    </div >
  )
}

export default Rectangle;