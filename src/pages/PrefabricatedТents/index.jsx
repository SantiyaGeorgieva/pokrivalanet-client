import { memo } from "react";
import { useTranslation } from "react-i18next";
import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import PageTitle from "../../components/PageTitle";
import { prefabricatedТents } from "../../constants";

import './prefabricatedТents.scss';

const PrefabricatedТents = memo(function PrefabricatedТents({ hideMain, isMobile }) {
  const { t } = useTranslation();
  PageTitle(t('prefabricated_tents_page_title'));

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
        <Gallery images={prefabricatedТents} isMobile={isMobile} />
        <Hr isMobile={isMobile} text={`${t('prefabricated_tents_link')}`} />
      </div>
    }
  </>
});

export default PrefabricatedТents;