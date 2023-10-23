import { Col, Row } from "reactstrap";
import PageTitle from "../../components/PageTitle";
import Hr from "../../components/Hr";

function AboutMe({ isMobile, hideMain }) {
  PageTitle('За мен | Покривала НЕТ');
  return <>{!hideMain &&
    <div className={`container ${isMobile ? 'my-1' : 'my-5'}`}>
      <Row className="text-start">
        <Col>
          <p>Този сайт е разработен от Сантия Георгиева.
            Предлагам професионално разработване на уеб сайтове на атрактивни цени.
            Ако посетения от Вас сайт ви е харесал и желаете и вие да имате такъв, може да се свържете се с мен,
            като ме потърсите на посочените по-долу контакти.
          </p>
        </Col>
      </Row>
      <Row className="text-start">
        <Col>
          <h4>За връзка с мен:</h4>
          <p className="mb-2"><i className="fa-solid fa-location-dot pe-2" />гр. Русе</p>
          <p className="mb-2"><i className="fa fa-phone pe-2" />+ 359 883 454 041</p>
          <p className="mb-0"><i className="fa-solid fa-envelope pe-2" />santiyageorgieva@yahoo.com</p>
        </Col>
      </Row>
      <Hr text="За мен" />
    </div>
  }
  </>
}

export default AboutMe;