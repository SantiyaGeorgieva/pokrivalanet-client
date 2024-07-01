import { memo } from "react";
import { useTranslation } from "react-i18next";
import SEO from "../../components/Seo";
import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import { largeCoversImages } from "../../constants";

import './largeCovers.scss';

const LargeCovers = memo(function LargeCovers({ hideMain, isMobile }) {
  const { t } = useTranslation();

  return <>
    <SEO title={`${t('large_and_covers_page_title')}`} linkHref="large-covers" />
    {!hideMain &&
      <div className={`container ${isMobile ? '' : 'my-4'}`}>
        <h1 className="pb-3">{t('large_covers_link')}</h1>
        {isMobile ? <p className="text-wrapper mb-1">
          {t('main_text6')}
        </p>
          : <>
            <p className="text-start mb-0">{t('main_text7')}</p>
            <p className="text-start">{t('main_text8')}</p>
          </>
        }
        <Gallery images={largeCoversImages} isMobile={isMobile} />
        <Hr isMobile={isMobile} text={`${t('large_covers_link')}`} />
      </div>
    }
  </>
});

export default LargeCovers;