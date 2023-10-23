import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import PageTitle from "../../components/PageTitle";
import { awningAnShadesImages } from "../../constants";

import './awningsAndShades.scss';

function AwningsAndShades({ hideMain, isMobile }) {
  PageTitle('Информация за Тенти и Сенници | Покривала НЕТ');

  return <>{!hideMain &&
    <div className={`container ${isMobile ? '' : 'my-4'}`}>
      {isMobile ? <p className="text-wrapper mb-1">Тентите и сенниците изработени от нас са от PVC синтетичен брезент. За изработката се използва специално оборудване, с цел избягване на разместване и набръчкване.</p>
        : <>
          <p className="text-start mb-0">Тентите и сенниците изработени от нас са от PVC синтетичен брезент.</p>
          <p className="text-start">За изработката се използва специално оборудване, с цел избягване на разместване и набръчкване.</p>
        </>
      }
      <Gallery images={awningAnShadesImages} isMobile={isMobile} />
      <Hr isMobile={isMobile} text="Тенти и сенници" />
    </div>
  }</>

}

export default AwningsAndShades;