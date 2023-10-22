import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import PageTitle from "../../components/PageTitle";
import { awningAnShadesImages } from "../../constants";

function AwningsAndShades({ hideMain, isMobile }) {
  PageTitle('Информация за Тенти и Сенници | Покривала НЕТ');

  return <>{!hideMain &&
    <div className="container my-4">
      <p className="text-start mb-0">Тентите и сенниците изработени от нас са от PVC синтетичен брезент.</p>
      <p className="text-start">За изработката се използва специално оборудване, с цел избягване на разместване и набръчкване.</p>
      <Gallery images={awningAnShadesImages} isMobile={isMobile} />
      <Hr text="Тенти и сенници" />
    </div>
  }</>

}

export default AwningsAndShades;