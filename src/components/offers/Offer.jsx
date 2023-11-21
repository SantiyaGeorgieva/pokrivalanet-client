import React from 'react';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import { useTranslation } from "react-i18next";
import OfferTitle from './OfferTitle';
import OfferBillTo from './OfferBillTo';
import OfferNo from './OfferNo';
import OfferItemsTable from './OfferItemsTable';
import OfferThankYouMsg from './OfferThankYouMsg';
import PageTitle from '../PageTitle';

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

const Offer = ({ invoice }) => {
  const { t } = useTranslation();
  PageTitle(t('windproof_curtains_page_title'));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <OfferBillTo invoice={invoice} />
        <OfferTitle title="title_оffer" />
        <OfferNo offerNoTitle="title_offer_no" offerDateTitle="offer_date_title" invoice={invoice} />
        <OfferItemsTable invoice={invoice} />
        <OfferThankYouMsg message="pdf_thankyou_msg" />
      </Page>
    </Document>
  );
}

export default Offer;