import { useTranslation } from 'react-i18next';
import PageTitle from "../../components/PageTitle";
import Hr from "../../components/Hr";
import Rectangle from "../../components/Rectangle";
import BackgroundBlob from "../../components/BackgroundBlob";

function Home({ hideMain, isMobile }) {
  const { t } = useTranslation();
  PageTitle(t('home_page_title'));

  return <>
    {!hideMain && (
      <div className="container-fluid px-0">
        <Rectangle isMobile={isMobile} text={t('home_text')} />
        <Hr text={t('hr_home_text')} />
        <BackgroundBlob isMobile={isMobile} text={`<p class='mb-1'>${t('backgroundBlob_text1')}</p>
        <p class='mb-1'>${t('backgroundBlob_text2')}</p>
        <p class='mb-4'>${t('backgroundBlob_text3')}</p>`} />
      </div>
    )}
  </>
}

export default Home;