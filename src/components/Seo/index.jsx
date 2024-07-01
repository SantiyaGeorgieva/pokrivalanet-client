import React from "react";
import { Helmet } from "react-helmet";

import "./seo.scss";

const SEO = ({ title, linkHref }) => {
  const description = `Покривала Нет произвежда покривала и брезенти за транспортни средства, изработени 
  от PVC материал. Покривалата се предлагат в различни цветове и тегло, в зависимост от вида на транспортното средство.
  Здрави и издръжливи, те са лесни за поставяне.`;
  const keywords = `брезенти, ветроупорни, завеси, тенти, сенници, покривала, рибарници, лагуни, рибарници и лагуни, 
  кравеферми, изделия, шатри, сглобяеми, облицовки, вагони, покривала за камиони, ветроупорни завеси, тенти и сенници,
  покривала за рибарници и лагуни, завеси за кравеферми, индустриални изделия, сглобяеми шатри, големи покривала,
  облицовки и покривала, покривала за вагони, контакти, PVC, PVC синтетичен брезент, синтетични брезенти, покривала и брезенти,
  брезенти и покривала, транспортни средства, камиони, pokrivala, pokrivala.net, брезенти бг, бг брезенти, бг покривала, 
  покривала бг, таван на щора за полуремарке, щора, щори, таван на юора, полуремарке, страници на щора за полуремарке-компкет
  от две, страници на щора за полуремарки с капаци-компкет от две, покривало за зърновоз или гондола, тристранна щора
  за полуремарке, обикновено покривало за тресачка, покривало за тресачка, страници на щора с капаци комплект от две,
  страници на щора без капаци комплкет от две, поставяне на рекламни надписи, ремонт на покривала, конструкция за брезент,
  обикновено покривало за камион или ремарке, покривало за камион или ремарке, покривало за камион и ремарке,
  покривало за камион, покривало за ремарке, ремарке, brezenti ruse, brezenti, brezenti bg, pokrivala,
  ruse brezenti, pokrivala ruse, ruse pokrivala, Покривала от брезент, брезентови покривала, синтетичен брезент,
  PVC покривала, винилови покривала, покривала за камиони, тир покривала, тавани за щори, щори за камиони`;

  return (
    <Helmet>
      <title>{title}</title>
      <link rel='preconnect' href="https://pokrivala.net" />
      <link rel="canonical" href={`https://pokrivala.net/${linkHref}`} />
      <meta http-equiv='cache-control' content='no-cache' />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv='expires' content='0' />
      <meta name="rating" content="pokrivala" />
      <meta name="description" content={description} />
      <meta name="classification" content="business" />
      <meta name="robots" content="all" />
      <meta name="rating" content="general" />
      <meta name="googlebot" content="notranslate" />
      <meta name="owner" content="Pokrivala Ltd Company" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:creator" content="Pokrivala Ltd Company" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default SEO;
