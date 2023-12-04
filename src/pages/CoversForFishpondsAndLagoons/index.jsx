import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import PageTitle from "../../components/PageTitle";
import { coversForFishpondsAndLagoonsImages } from "../../constants";

import './coversForFishpondsAndLagoons.scss';


const CoversForFishpondsAndLagoons = memo(function CoversForFishpondsAndLagoons({ hideMain, isMobile }) {
  const { t } = useTranslation();
  PageTitle(t('covers_for_fishponds_and_lagoons_page_title'));

  return <>
    {!hideMain &&
      <div className={`container ${isMobile ? '' : 'my-4'}`}>
        {isMobile ? <p className="text-wrapper mb-1">
          {t('main_text6')}
        </p>
          : <>
            <p className="text-start mb-0">{t('main_text7')}</p>
            <p className="text-start">{t('main_text8')}</p>
          </>
        }
        <Gallery images={coversForFishpondsAndLagoonsImages} isMobile={isMobile} />
        <Hr isMobile={isMobile} text={t('covers_for_fishponds_and_lagoons_link')} />
      </div>
    }
  </>
});

export default CoversForFishpondsAndLagoons;