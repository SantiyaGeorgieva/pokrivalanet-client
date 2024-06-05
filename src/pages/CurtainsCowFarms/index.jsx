import { memo } from "react";
import { useTranslation } from "react-i18next";
import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import PageTitle from "../../components/PageTitle";
import { curtainsCowFarmsImages } from "../../constants";

import './curtainsCowFarmsImages.scss';


const CurtainsCowFarms = memo(function CurtainsCowFarms({ hideMain, isMobile }) {
  const { t } = useTranslation();
  PageTitle(t('curtains_cow_farms_page_title'));

  return <>
    {!hideMain &&
      <div className={`container ${isMobile ? '' : 'my-4'}`}>
        <h1 className="pb-3">{t('curtains_for_cow_farms_link')}</h1>
        {isMobile ? <p className="text-wrapper mb-1">
          {t('main_text6')}
        </p>
          : <>
            <p className="text-start mb-0">{t('main_text7')}</p>
            <p className="text-start">{t('main_text8')}</p>
          </>
        }
        <Gallery images={curtainsCowFarmsImages} isMobile={isMobile} />
        <Hr isMobile={isMobile} text={`${t('curtains_for_cow_farms_link')}`} />
      </div>
    }
  </>
});

export default CurtainsCowFarms;