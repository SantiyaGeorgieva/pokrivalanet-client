import Gallery from "../../components/Gallery";
import Hr from "../../components/Hr";
import PageTitle from "../../components/PageTitle";
import { industrialProducts } from "../../constants";

import './industrialProducts.scss';

function IndustrialProducts({ hideMain, isMobile }) {
  PageTitle('Информация за Индустриални Изделия | Покривала НЕТ');

  return <>{!hideMain &&
    <div className={`container ${isMobile ? '' : 'my-4'}`}>
      {isMobile ? <p className="text-wrapper mb-1">
        За да Ви предоставим ценова оферта за този продукт ни е необходима повече информация.
        Моля, свържете се с нас за да ни предоставите такава.
        Можете да ни изпратите скица с размери или схема по имейл или вайбър.
      </p>
        : <>
          <p className="text-start mb-0">За да Ви предоставим ценова оферта за този продукт ни е необходима повече информация.</p>
          <p className="text-start mb-0">Моля, свържете се с нас за да ни предоставите такава.</p>
          <p className="text-start">Можете да ни изпратите скица с размери или схема по имейл или вайбър.</p>
        </>
      }
      <Gallery images={industrialProducts} isMobile={isMobile} />
      <Hr isMobile={isMobile} text="индустриални изделия" />
    </div>
  }</>

}

export default IndustrialProducts;