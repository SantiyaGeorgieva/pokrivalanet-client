import { Row, Col, Spinner } from "reactstrap";
import ModalImage from "react-modal-image";

import './gallery.scss';

function Gallery({ images, isMobile }) {
  const result = images.map(a => a.image);
  const firstRow = result.slice(0, 4);
  const secondRow = result.slice(4, 8);
  const lastRow = result.slice(8, result.length);

  return (
    <div className={`container ${isMobile ? 'px-0' : ''}`}>
      <Row>
        {firstRow.map((img, idx) => {
          return <Col md="3" key={idx} className={`${isMobile ? 'mb-3' : 'ps-0'}`}>
            {!img ? <Spinner className="m-5" color="primary" /> : <ModalImage
              small={img}
              large={img}
              className="gallery-image"
            />}
          </Col>
        })}
      </Row>
      <Row className={`${!isMobile ? 'my-3' : ''}`}>
        {secondRow.map((img, idx) => {
          return <Col md="3" key={idx} className={`${isMobile ? 'mb-3' : 'ps-0'}`}>
            {!img ? <Spinner className="m-5" color="primary" /> : <ModalImage
              small={img}
              large={img}
              className="gallery-image"
            />}
          </Col>
        })}
      </Row>
      <Row className={`${!isMobile ? 'my-3' : ''}`}>
        {lastRow.map((img, idx) => {
          return <Col md="3" key={idx} className={`${isMobile && idx !== 4 ? 'mb-3' : 'ps-0'}`}>
            {!img ? <Spinner className="m-5" color="primary" /> : <ModalImage
              small={img}
              large={img}
              className="gallery-image"
            />}
          </Col>
        })}
      </Row>
    </div>
  )
}

export default Gallery;