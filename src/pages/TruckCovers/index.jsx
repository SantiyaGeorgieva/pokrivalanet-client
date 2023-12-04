import { memo } from "react";
import { useTranslation } from "react-i18next";
import CardsCover from "../../components/CardsCover";
import PageTitle from "../../components/PageTitle";
import { cardslItems } from "../../constants";

import './truckCovers.scss';

const TruckCovers = memo(function TruckCovers({ hideMain, handleCardTitle, isMobile }) {
  const { t } = useTranslation();
  PageTitle(t('truck_covers_page_title'));

  return <>
    {!hideMain &&
      <div className={`container ${isMobile ? '' : 'my-4'}`}>
        {isMobile ? <p className="text-wrapper mb-1">
          {t('main_text1')}
        </p>
          : <div className="mx-4">
            <p className="text-start mb-3">{t('main_text1')}</p>
          </div>
        }
        <CardsCover handleCardTitle={handleCardTitle} cards={cardslItems} isMobile={isMobile} />
      </div>
    }
  </>
});

export default TruckCovers;