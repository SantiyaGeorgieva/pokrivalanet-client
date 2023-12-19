import { Row, Col, Spinner } from "reactstrap";
import ModalImage from "react-modal-image";

import './gallery.scss';

function Gallery({ images, isMobile }) {
  const result = images.map(a => a.image);
  const firstRow = result.slice(0, 4);
  const secondRow = result.slice(4, 8);
  const lastRow = result.slice(8, result.length);

  return (
    <div className={`gallery-wrapper container ${isMobile ? '' : ''}`}>
      <Row>
        {firstRow.map((img, idx) => {
          return <Col key={idx} className="column">
            {!img ? <Spinner className="m-5" color="primary" /> : <ModalImage
              small={img}
              large={img}
              className="gallery-image"
            />}
          </Col>
        })}
      </Row>
      <Row>
        {secondRow.map((img, idx) => {
          return <Col key={idx} className="column">
            {!img ? <Spinner className="m-5" color="primary" /> : <ModalImage
              small={img}
              large={img}
              className="gallery-image"
            />}
          </Col>
        })}
      </Row>
      <Row>
        {lastRow.map((img, idx) => {
          return <Col key={idx} className="column">
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