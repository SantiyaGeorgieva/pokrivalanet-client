import React from 'react';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import { useTranslation } from "react-i18next";
import OfferTitle from './OfferTitle';
import OfferBillTo from './OfferBillTo';
import OfferNo from './OfferNo';
import OfferThankYouMsg from './OfferThankYouMsg';
import PageTitle from '../PageTitle';
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

const Offer = ({ items, title, parametersText, totalPrice }) => {
  const { t } = useTranslation();
  PageTitle(t('windproof_curtains_page_title'));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <OfferBillTo />
        <OfferTitle offerTitle="title_оffer" title={title} />
        <OfferNo offerNoTitle="title_offer_no" offerDateTitle="offer_date_title" />
        <OfferTable parametersText={parametersText} items={items} totalPrice={totalPrice} message="pdf_thankyou_msg" />
        <OfferThankYouMsg message="pdf_thankyou_msg" />
      </Page>
    </Document>
  );
}

export default Offer;