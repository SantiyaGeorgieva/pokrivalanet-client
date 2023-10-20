import { Row, Col } from "reactstrap";
import ModalImage from "react-modal-image";

import Image1 from '../../images/tenti_i_sennici/116443746_2505862182850238_7492137708318460762_n.jpg';
import Image2 from '../../images/tenti_i_sennici/116802153_2505862039516919_3232055405810939760_n.jpg';
import Image3 from '../../images/tenti_i_sennici/17499035_920825968020542_433473562501709200_n 1.png';
import Image4 from '../../images/tenti_i_sennici/20287223_1014415988661539_8732413804471106823_o.jpg';
import Image5 from '../../images/tenti_i_sennici/20369194_1014415951994876_3950311241741960921_o.jpg';
import Image6 from '../../images/tenti_i_sennici/280728142_4345127798923658_6506545883028723979_n.jpg';
import Image7 from '../../images/tenti_i_sennici/281363397_4345127908923647_9047782952210735173_n.jpg';
import Image8 from '../../images/tenti_i_sennici/281472588_4345127758923662_8833557829961434400_n.jpg';
import Image9 from '../../images/tenti_i_sennici/35844698_1265999726836496_2129561282049736704_n.jpg';
import Image10 from '../../images/tenti_i_sennici/35882682_1265999740169828_997282773246935040_n.jpg';
import Image11 from '../../images/tenti_i_sennici/66775396_1766036240166173_4429178534304415744_n.jpg';
import Image12 from '../../images/tenti_i_sennici/66848446_1766036230166174_3605350399013289984_n.jpg';

import './gallery.scss';
import { awningAnShadesImages } from "../../constants";

function Gallery() {
  const rows = [1, 2, 3];
  const cols = [1, 2, 3, 4];

  return (
    <div className="container px-0">
      {rows.map((row, i) => {
        return <Row>
          {cols.map((col, j) => {
            return <Col md="3">
              {awningAnShadesImages.filter((image, index) => {
                return <ModalImage
                  small={index >= 0 && index < awningAnShadesImages.length - 1 && awningAnShadesImages[index + 1].image}
                  large={index >= 0 && index < awningAnShadesImages.length - 1 && awningAnShadesImages[index + 1].image}
                  className="gallery-image"
                />
              })}
            </Col>
          })}
        </Row>
      })}

      {/* <Row>
        <Col md="3">
          <ModalImage
            small={Image1}
            large={Image1}
            className="gallery-image"
            alt="Hello World!"
          />
        </Col>
        <Col md="3">
          <img src={Image2} className="gallery-image" />
        </Col>
        <Col md="3">
          <img src={Image3} className="gallery-image" />
        </Col>
        <Col md="3">
          <img src={Image4} className="gallery-image" />
        </Col>
      </Row>
      <Row className="my-5">
        <Col md="3">
          <img src={Image5} className="gallery-image" />
        </Col>
        <Col md="3">
          <img src={Image6} className="gallery-image" />
        </Col>
        <Col md="3">
          <img src={Image7} className="gallery-image" />
        </Col>
        <Col md="3">
          <img src={Image8} className="gallery-image" />
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <img src={Image9} className="gallery-image" />
        </Col>
        <Col md="3">
          <img src={Image10} className="gallery-image" />
        </Col>
        <Col md="3">
          <img src={Image11} className="gallery-image" />
        </Col>
        <Col md="3">
          <img src={Image12} className="gallery-image" />
        </Col>
      </Row> */}
    </div>
  )
}

export default Gallery;