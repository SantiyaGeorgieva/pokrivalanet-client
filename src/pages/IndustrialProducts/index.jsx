import { memo } from "react";
import { useTranslation } from "react-i18next";
import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import PageTitle from "../../components/PageTitle";
import { industrialProducts } from "../../constants";

import './industrialProducts.scss';

const IndustrialProducts = memo(function IndustrialProducts({ hideMain, isMobile }) {
  const { t } = useTranslation();
  PageTitle(t('industrial_products_page_title'));

  return <>
    {!hideMain &&
      <div className={`container ${isMobile ? '' : 'my-4'}`}>
        <h1 className="pb-3">{t('industrial_products_link')}</h1>
        {isMobile ? <p className="text-wrapper mb-1">
          {t('main_text6')}
        </p>
          : <>
            <p className="text-start mb-0">{t('main_text7')}</p>
            <p className="text-start">{t('main_text8')}</p>
          </>
        }
        <Gallery images={industrialProducts} isMobile={isMobile} />
        <Hr isMobile={isMobile} text={`${t('industrial_products_link')}`} />
      </div>
    }
  </>
});

export default IndustrialProducts;