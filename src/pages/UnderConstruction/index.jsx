import CookieConsent from 'react-cookie-consent';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import underConstruction from '../../images/underconstruction.jpg';

function UnderConstruction() {
  return (
    <div>
      <Header />
      <img src={underConstruction} alt="under construction image" />
      <Footer />
      <CookieConsent
        location="bottom"
        buttonText="Приеми"
        cookieName="myAwesomeCookieName2"
        style={{ display: 'flex', alignItems: 'center', background: "#2B373B", textAlign: 'left', padding: '10px 0 10px 15px' }}
        buttonStyle={{ background: '#fff', color: "#4e503b", fontSize: "13px", fontWeight: '600' }}
        expires={150}
      >
        <p className="mb-0">Pokrivala използва бисквитки, за да гарантира на потребителите използването на функциите на своя сайт, като предлага по-добро потребителско изживяване.</p>
        <p className="mb-0">Продължавайки да разглеждате сайта, вие се съгласявате с използването на бисквитки.</p>
      </CookieConsent>
    </div>
  );
}

export default UnderConstruction;