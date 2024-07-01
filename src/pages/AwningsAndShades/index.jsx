import { memo } from "react";
import { useTranslation } from "react-i18next";
import SEO from "../../components/Seo";
import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import { awningAnShadesImages } from "../../constants";

import './awningsAndShades.scss';

const AwningsAndShades = memo(function AwningsAndShades({ hideMain, isMobile }) {
  const { t } = useTranslation();

  return <>
    <SEO title={`${t('awnings_and_shades_page_title')}`} linkHref="awnings-and-shades" />
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