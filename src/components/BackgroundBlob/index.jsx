import { Button } from "reactstrap";
import './backgroundBlob.scss';

function BackgroundBlob({ isMobile, text }) {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className={`pokrivala-cover mb-5 ${isMobile ? 'small' : ''}`}>
        <div className="light-rectangle" />
        <div className="centered-text">
          <div dangerouslySetInnerHTML={{ __html: text }} />
          <Button type="button" className="button-blob">Обадете се!</Button>
        </div>
      </div>
    </div>
  )
}

export default BackgroundBlob;