import CardsCover from "../../components/CardsCover";
import PageTitle from "../../components/PageTitle";
import { cardslItems } from "../../constants";

import './truckCovers.scss';

function TruckCovers({ hideMain, isMobile }) {
  PageTitle('Информация за Покривала за Камиони | Покривала НЕТ');

  return <>{!hideMain &&
    <div className={`container ${isMobile ? '' : 'my-4'}`}>
      {isMobile ? <p className="text-wrapper mb-1">
        Ние произвеждаме покривала и брезенти за транспортни средства, изработени от PVC материал.
        Покривалата се предлагат в различни цветове и тегло, в зависимост от вида на транспортното средство.
        Здрави и издръжливи, те са лесни за поставяне.
      </p>
        : <>
          <p className="text-start mb-0">Ние произвеждаме покривала и брезенти за транспортни средства, изработени от PVC материал.</p>
          <p className="text-start mb-0">Покривалата се предлагат в различни цветове и тегло, в зависимост от вида на транспортното средство.</p>
          <p className="text-start">Здрави и издръжливи, те са лесни за поставяне.</p>
        </>
      }
      <CardsCover cards={cardslItems} isMobile={isMobile} />
    </div>
  }</>

}

export default TruckCovers