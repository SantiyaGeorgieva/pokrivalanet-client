import { useTranslation } from "react-i18next";
import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import PageTitle from "../../components/PageTitle";
import { liningsAndCoversImages } from "../../constants";

import './liningsAndCovers.scss';
import { memo } from "react";

const LiningsAndCovers = memo(function LiningsAndCovers({ hideMain, isMobile }) {
  const { t } = useTranslation();
  PageTitle(t('large_and_covers_page_title'));

  return <>
    {!hideMain &&
      <div className={`container ${isMobile ? '' : 'my-4'}`}>
        <h1 className="text-center pb-3">{t('linings_and_covers_link')}</h1>
        {isMobile ? <p className="text-wrapper mb-1">
          {t('main_text6')}
        </p>
          : <>
            <p className="text-start mb-0">{t('main_text7')}</p>
            <p className="text-start">{t('main_text8')}</p>
          </>
        }
        <Gallery images={liningsAndCoversImages} isMobile={isMobile} />
        <Hr isMobile={isMobile} text={`${t('linings_and_covers_link')}`} />
      </div>
    }
  </>
});

export default LiningsAndCovers;