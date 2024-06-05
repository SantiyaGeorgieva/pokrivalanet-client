import { memo } from "react";
import { useTranslation } from "react-i18next";
import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import PageTitle from "../../components/PageTitle";
import { awningAnShadesImages } from "../../constants";

import './awningsAndShades.scss';

const AwningsAndShades = memo(function AwningsAndShades({ hideMain, isMobile }) {
  const { t } = useTranslation();
  PageTitle(t('awnings_and_shades_page_title'));

  return <>
    {!hideMain &&
      <div className={`container ${isMobile ? '' : 'my-4'}`}>
        <h1 className="pb-3">{t('awnings_and_shades_link')}</h1>
        {isMobile ? <p className="text-wrapper mb-1">{t('main_text3')}</p>
          : <>
            <p className="text-start mb-0">{t('main_text3')}</p>
            <p className="text-start">{t('main_text6')}</p>
          </>
        }
        <Gallery images={awningAnShadesImages} isMobile={isMobile} />
        <Hr isMobile={isMobile} text={`${t('awnings_and_shades_link')}`} />
      </div>
    }
  </>
});

export default AwningsAndShades;