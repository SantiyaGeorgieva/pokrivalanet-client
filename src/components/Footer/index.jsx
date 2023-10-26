import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import './footer.scss';
import { scrollToTop } from '../../utils';

function Footer({ isMobile }) {

  return (
    <div className="container-fluid">
      <Row className={`bc-dark-blue ${isMobile ? 'small' : ''}`}>
        <Col>
          <div className="container">
            <Row className="footer-menu">
              <Col md="4" className={`d-flex flex-column text-start ${isMobile ? 'w-50' : ''}`}>
                <Link onClick={scrollToTop} to="/">Начало</Link>
                <Link onClick={scrollToTop} to="/truck-covers">Покривала за камиони</Link>
                <Link onClick={scrollToTop} to="/windproof-curtains">Ветроупорни завеси</Link>
                <Link onClick={scrollToTop} to="/awnings-and-shades">Тенти и сенници</Link>
                <Link onClick={scrollToTop} to="/covers-for-fishponds-and-lagoons">Покривала за рибарници и лагуни</Link>
                <Link onClick={scrollToTop} to="/curtains-for-cow-farms">Завеси за кравеферми</Link>
              </Col>
              <Col md="4" className="d-flex flex-column text-start">
                <Link onClick={scrollToTop} to="/industrial-products">Индустриални  изделия</Link>
                <Link onClick={scrollToTop} to="/prefab-tents">Сглобяеми шатри</Link>
                <Link onClick={scrollToTop} to="/large-bedspreads">Големи покривала</Link>
                <Link onClick={scrollToTop} to="/linings-and-covers">Облицовки и покривала</Link>
                <Link onClick={scrollToTop} to="/cover-for-wagons">Покривала за вагони</Link>
                <Link onClick={scrollToTop} to="/contact">Контакти</Link>
              </Col>
              {!isMobile && <Col md="4" className="d-flex align-items-end justify-content-center">
                <div className="d-flex align-items-center social-icons">
                  <p className="mb-0 me-2 text-light">Намерете ни</p>
                  <Link to="https://www.facebook.com/brezentiruse" target="_blank" className="mb-0">
                    <i className="fa-brands fa-facebook fs-4 me-2 text-light"></i>
                  </Link>
                  <Link to="https://www.facebook.com/CreativeIdeaGroup/?fref=ts" target="_blank">
                    <i className="fa-brands fa-facebook fs-4 text-light"></i>
                  </Link>
                </div>
              </Col>}
            </Row>
            {isMobile &&
              <Row>
                <Col>
                  <div className="d-flex align-items-center justify-content-center mt-4 social-icons">
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
            }
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
          <Link onClick={scrollToTop} to="/about-me" className={`c-blue-text text-decoration-none mb-0 ${isMobile ? 'text-center' : 'text-end me-5'}`}>
            Designed | Created by Santiya Georgieva
          </Link>
        </Col>
      </Row>
    </div >
  );
}

export default Footer;
