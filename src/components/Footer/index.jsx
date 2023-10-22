import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import './footer.scss';

function Footer({ isMobile }) {
  return (
    <div className="container-fluid">
      <Row className={`bc-dark-blue ${isMobile ? 'small' : ''}`}>
        <Col>
          <div className="container">
            <Row className="footer-menu">
              <Col md="4" className="d-flex flex-column text-start">
                <Link to="/">Начало</Link>
                <Link to="/truck-covers">Покривала за камиони</Link>
                <Link to="/windproof-curtains">Ветроупорни завеси</Link>
                <Link to="/awnings-and-shades">Тенти и сенници</Link>
                <Link to="/covers-for-fishponds-and-lagoons">Покривала за рибарници и лагуни</Link>
                <Link to="/curtains-for-cow-farms">Завеси за кравеферми</Link>
              </Col>
              <Col md="4" className="d-flex flex-column text-start">
                <Link to="/industrial-products">Индустриални  изделия</Link>
                <Link to="/prefab-tents">Сглобяеми шатри</Link>
                <Link to="/large-bedspreads">Големи покривала</Link>
                <Link to="/linings-and-covers">Облицовки и покривала</Link>
                <Link to="/cover-for-wagons">Покривала за вагони</Link>
                <Link to="/contact">Контакти</Link>
              </Col>
              <Col md="4" className="d-flex align-items-end justify-content-center">
                <div className="d-flex align-items-center social-icons">
                  <p className="mb-0 me-2 text-light">Намерете ни</p>
                  <Link to="https://www.facebook.com/brezentiruse" target="_blank" className="mb-0">
                    <i className="fa-brands fa-facebook fs-4 me-2 text-light"></i>
                  </Link>
                  <Link to="https://www.facebook.com/CreativeIdeaGroup/?fref=ts" target="_blank">
                    <i className="fa-brands fa-facebook fs-4 text-light"></i>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row className={`bc-dark-blue ${isMobile ? 'small' : ''}`}>
        <Col md="6" className={`${isMobile ? 'text-center' : 'text-start'}`}>
          <p className={`c-blue-text mb-0 ${isMobile ? 'text-center' : 'text-start ms-5'}`}>
            {new Date().getFullYear()} © Всички права запазени
          </p>
        </Col>
        <Col md="6" className={`${isMobile ? 'text-center' : 'text-end'}`}>
          <p className={`c-blue-text mb-0 ${isMobile ? 'text-center' : 'text-end me-5'}`}>
            Designed | Created by Santiya Georgieva
          </p>
        </Col>
      </Row>
    </div >
  );
}

export default Footer;
