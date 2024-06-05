import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import PageTitle from "../../components/PageTitle";
import Hr from "../../components/Hr";
import NotFoundImage from "../../images/404.png";
import { scrollToTop } from "../../utils";

import './notFound.scss';

const NotFound = memo(function NotFound({ hideMain, isMobile }) {
  const { t } = useTranslation();
  PageTitle(t('not_found_page_title'));

  return <>
    {!hideMain &&
      <div className={`container ${isMobile ? '' : 'my-3'}`}>
        {isMobile ? <div>
          <img src={NotFoundImage} alt="Not found image" className="w-50 mt-3" />
          <p className="text-wrapper mt-3 mb-0">{t('not_found_text')}</p>
          <Link to="/">
            <Button className="button-back mt-3 btn-sm">{t('back_button')}</Button>
          </Link>
        </div>
          : <div className="d-flex flex-column align-items-center justify-content-center mt-5">
            <img className="w-50" src={NotFoundImage} alt="Not found image" />
            <h5 className="mt-5 mb-0">{t('not_found_text')}</h5>
            <Link to="/">
              <Button className="button-back mt-5" onClick={scrollToTop}>{t('back_button')}</Button>
            </Link>
          </div>
        }
        <Hr isMobile={isMobile} text={t('hr_not_found_text')} />
      </div>
    }
  </>
})

export default NotFound;