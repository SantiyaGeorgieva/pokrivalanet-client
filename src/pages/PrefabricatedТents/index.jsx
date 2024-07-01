import { memo } from "react";
import { useTranslation } from "react-i18next";
import SEO from "../../components/Seo";
import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import { prefabricatedТents } from "../../constants";

import './prefabricatedТents.scss';

const PrefabricatedТents = memo(function PrefabricatedТents({ hideMain, isMobile }) {
  const { t } = useTranslation();

  return <>
    <SEO title={`${t('prefabricated_tents_page_title')}`} linkHref="prefibricated-tents" />
    {!hideMain &&
      <div className={`container ${isMobile ? '' : 'my-4'}`}>
        <h1 className="pb-3">{t('prefabricated_tents_link')}</h1>
        {isMobile ? <p className="text-wrapper mb-1">
          {t('main_text6')}
        </p>
          : <>
            <p className="text-start mb-0">{t('main_text7')}</p>
            <p className="text-start">{t('main_text8')}</p>
          </>
        }
        <Gallery images={prefabricatedТents} isMobile={isMobile} />
        <Hr isMobile={isMobile} text={`${t('prefabricated_tents_link')}`} />
      </div>
    }
  </>
});

export default PrefabricatedТents;