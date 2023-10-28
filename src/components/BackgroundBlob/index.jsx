import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../utils";

import './backgroundBlob.scss';

function BackgroundBlob({ isMobile, text }) {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className={`pokrivala-cover mb-5 ${isMobile ? 'small' : ''}`}>
        <div className="light-rectangle" />
        <div className="centered-text">
          <div dangerouslySetInnerHTML={{ __html: text }} />
          <Button type="button" className="button-blob" onClick={scrollToTop}>
            <Link to="/contact" className="text-decoration-none text-light">Обадете се!</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BackgroundBlob;