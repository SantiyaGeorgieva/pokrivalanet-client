import CookieConsent from "react-cookie-consent";
import Footer from "../../components/Footer";
import Gallery from "../../components/Gallery";
import Header from "../../components/Header";
import Hr from "../../components/Hr";
import PageTitle from "../../components/PageTitle";
import { awningAnShadesImages } from "../../constants";

function AwningsAndShades() {
  PageTitle('Информация за Тенти и Сенници | Покривала НЕТ');
  return (
    <>
      <Header />
      <div className="container my-4">
        <p className="text-start mb-0">Тентите и сенниците изработени от нас са от PVC синтетичен брезент.</p>
        <p className="text-start">За изработката се използва специално оборудване, с цел избягване на разместване и набръчкване.</p>
        <Gallery images={awningAnShadesImages} />
        <Hr text="Тенти и сенници" />
      </div>
      <Footer />
      <CookieConsent
        location="bottom"
        buttonText="Приеми"
        cookieName="pokrivalaCookie"
        style={{ display: 'flex', alignItems: 'center', background: "#2B373B", textAlign: 'left', padding: '10px 0 10px 15px', opacity: '.85' }}
        buttonStyle={{ background: '#fff', color: "#4e503b", fontSize: "13px", fontWeight: '600', borderRadius: '30px' }}
        expires={150}
      >
        <p className="mb-0">Pokrivala използва бисквитки, за да гарантира на потребителите използването на функциите на своя сайт, като предлага по-добро потребителско изживяване.</p>
        <p className="mb-0">Продължавайки да разглеждате сайта, вие се съгласявате с използването на бисквитки.</p>
      </CookieConsent>
    </>
  )
}

export default AwningsAndShades;