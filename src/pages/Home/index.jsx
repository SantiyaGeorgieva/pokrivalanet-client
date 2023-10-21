import CookieConsent from "react-cookie-consent";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HomeSlider from "../../components/Slider";
import Hr from "../../components/Hr";
import Rectangle from "../../components/Rectangle";
import BackgroundBlob from "../../components/BackgroundBlob";
import PageTitle from "../../components/PageTitle";

function Home() {
  PageTitle('Тенти и Брезенти Русе, Ветроупорни Завеси, Тир Покривала | Покривала НЕТ');
  return (
    <div className="container-fluid px-0">
      <Header />
      <HomeSlider />
      <Hr text="За нас" />
      <Rectangle rectangleClass="gray-rectangle" text="Ако търсите изделия от PVC, които да удовлетворят не само Вашите високи стандарти,
       но и Вашите потребности, ще ги откриете в БРЕЗЕНТИ БГ ООД. Специализирани сме в производството и продажбата на тир покривала, 
       покривала за други транспортни средства, ветроупорни завеси, тенти и брезенти в Русе. Високата функционалност, безупречното качество 
       и старанието, вложено в изработката на всеки детайл, са сред ключовите преимущества на нашите продукти. Съвременната техника и
        иновативните производствени технологии, с които боравим, ни позволяват да предложим на клиентите изделия, съобразени не само с 
        утвърдените стандарти, но и с техните индивидуални предпочитания. Удобството в обслужването повишаваме като предоставяме на 
        Вашите транспортни средства лесен достъп до производствените ни помещения. Нашите специалисти имат зад гърба си повече от 
        20 г. опит в изработката на изделия от PVC, затова можете да разчитате на истински професионализъм от тяхна страна. 
        Екипът ни разработва както собствени проекти, така и проекти, съобразени със специфичните изисквания на всеки клиент. 
        Можем да изпълним поръчка по Ваша идея." />
      <BackgroundBlob text="<p class='mb-1'>Имате товарни превозни средства, заведение, басейн?</p>
        <p class='mb-1'>Заповядайте при нас!</p>
        <p class='mb-4'>Тук ще откриете най-качествените тир покривала, тенти и брезенти в Русе!</p>" />
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

export default Home;