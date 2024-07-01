import { memo } from "react";
import { useTranslation } from "react-i18next";
import SEO from "../../components/Seo";
import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import { wagonCoversImages } from "../../constants";

import './wagonCover.scss';

const WagonCovers = memo(function WagonCovers({ hideMain, isMobile }) {
  const { t } = useTranslation();

  return <>
    <SEO title={`${t('cover_for_wagons_link')}`} linkHref="cover-for-wagons" />
    {!hideMain &&
      <div className={`container ${isMobile ? '' : 'my-4'}`}>
        <h1 className="pb-3">{t('cover_for_wagons_link')}</h1>
        {isMobile ? <p className="text-wrapper mb-1">
          {t('main_text6')}
        </p>
          : <>
              <p className="text-start mb-0">{t('main_text7')}</p>
              <p className="text-start">{t('main_text8')}</p>
          </>
        }
        <Gallery images={wagonCoversImages} isMobile={isMobile} />
        <Hr isMobile={isMobile} text={`${t('cover_for_wagons_link')}`} />
      </div>
    }
  </>
});

export default WagonCovers;