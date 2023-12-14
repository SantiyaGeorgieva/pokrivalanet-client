import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogoWhite from '../../images/logo-white.png';
import { scrollToTop } from '../../utils';

import './footer.scss';

function Footer({ isMobile }) {
  const { t } = useTranslation();

  return (
    <div className="container-fluid">
      <Row className={`bc-dark-blue ${isMobile ? 'small' : ''}`}>
        <Col>
          <div className="container">
            <Row className="footer-menu">
              <Col xl="4" className={`d-flex flex-column text-start ${isMobile ? 'w-50' : ''}`}>
                {/* <Link onClick={scrollToTop} to="/">{t('home_link')}</Link> */}
                <Link onClick={scrollToTop} to="/truck-covers">{t('truck_cover_link')}</Link>
                <Link onClick={scrollToTop} to="/windproof-curtains">{t('windproof_curtains_link')}</Link>
                <Link onClick={scrollToTop} to="/awnings-and-shades">{t('awnings_and_shades_link')}</Link>
                <Link onClick={scrollToTop} to="/covers-for-fishponds-and-lagoons">{t('covers_for_fishponds_and_lagoons_link')}</Link>
                <Link onClick={scrollToTop} to="/curtains-for-cow-farms">{t('curtains_for_cow_farms_link')}</Link>
                <Link onClick={scrollToTop} to="/industrial-products">{t('industrial_products_link')}</Link>
              </Col>
              <Col xl="4" className="d-flex flex-column text-start">
                <Link onClick={scrollToTop} to="/prefabricated-tents">{t('prefabricated_tents_link')}</Link>
                <Link onClick={scrollToTop} to="/large-bedspreads">{t('large_covers_link')}</Link>
                <Link onClick={scrollToTop} to="/linings-and-covers">{t('linings_and_covers_link')}</Link>
                <Link onClick={scrollToTop} to="/cover-for-wagons">{t('cover_for_wagons_link')}</Link>
                <Link onClick={scrollToTop} to="/contact">{t('contacts_link')}</Link>
              </Col>
              {!isMobile && <Col md="4" className="d-flex align-items-end justify-content-center">
                <div className="d-flex flex-column align-items-center social-icons">
                  <Link onClick={scrollToTop} to="/truck-covers">
                    <img src={LogoWhite} alt="Logo white" className="w-50" />
                  </Link>
                  <div className="d-flex mt-2">
                    <p className="mb-0 me-2 text-light">{t('follows_button')}</p>
                    <Link to="https://www.facebook.com/brezentiruse" aria-label="https://www.facebook.com/brezentiruse" target="_blank" className="mb-0">
                      <i className="fa-brands fa-facebook fs-4 me-2 text-light"></i>
                    </Link>
                    <Link to="https://www.facebook.com/CreativeIdeaGroup/?fref=ts" aria-label="https://www.facebook.com/CreativeIdeaGroup/?fref=ts" target="_blank">
                      <i className="fa-brands fa-facebook fs-4 text-light"></i>
                    </Link>
                  </div>
                </div>
              </Col>}
            </Row>
            {isMobile &&
              <Row>
                <Col>
                  <div className="d-flex align-items-center justify-content-center mt-4 social-icons">
                    <p className="mb-0 me-2 text-light">{t('follows_button')}</p>
                    <Link to="https://www.facebook.com/brezentiruse" aria-label="https://www.facebook.com/brezentiruse" target="_blank" className="mb-0">
                      <i className="fa-brands fa-facebook fs-4 me-2 text-light"></i>
                    </Link>
                    <Link to="https://www.facebook.com/CreativeIdeaGroup/?fref=ts" aria-label="https://www.facebook.com/CreativeIdeaGroup/?fref=ts" target="_blank">
                      <i className="fa-brands fa-facebook fs-4 text-light"></i>
                    </Link>
                    <Link onClick={scrollToTop} to="/truck-covers">
                      <img src={LogoWhite} alt="Logo white" className="w-50" />
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
            {new Date().getFullYear()} © {t('copyright_text')}
          </p>
        </Col>
        <Col md="6" className={`${isMobile ? 'text-center' : 'text-end'}`}>
          <Link onClick={scrollToTop} to="/about-me" className={`c-blue-text text-decoration-none mb-0 ${isMobile ? 'text-center' : 'text-end me-5'}`}>
            {t('footer_text')}
          </Link>
        </Col>
      </Row>
    </div >
  );
}

export default Footer;
