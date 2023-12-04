import { memo } from "react";
import { Col, Row } from "reactstrap";
import PageTitle from "../../components/PageTitle";
import { useTranslation } from "react-i18next";
import Hr from "../../components/Hr";

const AboutMe = memo(function AboutMe({ hideMain, isMobile }) {
  const { t } = useTranslation();
  PageTitle(t('about_me_page_title'));

  return <>
    {!hideMain &&
      <div className={`container ${isMobile ? 'small my-1' : 'my-5'}`}>
        <Row className="text-start">
          <Col>
            <p className="mb-0">{t('about_me_text1')}</p>
            <p className="mb-0">{t('about_me_text2')}</p>
            <p>{t('about_me_text3')}</p>
          </Col>
        </Row>
        <Row className="text-start mt-5">
          <Col>
            <h4>{t('about_me_text4')}</h4>
            <p className="mb-2"><i className="fa-solid fa-location-dot pe-2" />{t('city2')}</p>
            <p className="mb-2"><i className="fa fa-phone pe-2" />+ 359 883 454 041</p>
            <p className="mb-0"><i className="fa-solid fa-envelope pe-2" />santiyageorgieva@yahoo.com</p>
          </Col>
        </Row>
        <Hr text={t('hr_about_me_text')} />
      </div>
    }
  </>
});

export default AboutMe;