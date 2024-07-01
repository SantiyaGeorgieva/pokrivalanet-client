import React from 'react';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import { useTranslation } from "react-i18next";
import SEO from '../Seo';
import OfferTitle from './OfferTitle';
import OfferBillTo from './OfferBillTo';
import OfferNo from './OfferNo';
import OfferThankYouMsg from './OfferThankYouMsg';
import OfferTable from './OfferTable';

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  logo: {
    width: '15%',
    marginLeft: 'auto',
  }
});

const Offer = ({ items, title, offerNo, parametersText, totalPrice }) => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title={`${t('windproof_curtains_page_title')}`} linkHref="windproof-curtains-offer" />
      <Document>
        <Page size="A4" style={styles.page}>
          <OfferBillTo />
          <OfferTitle offerTitle="title_оffer" title={title} />
          <OfferNo items={items[0]} offerNoTitle="title_offer_no" offerNo={offerNo} offerDateTitle="offer_date_title" />
          <OfferTable parametersText={parametersText} items={items} totalPrice={totalPrice} title={title} />
          <OfferThankYouMsg message="pdf_thankyou_msg" />
        </Page>
      </Document>
    </>
  );
}

export default Offer;