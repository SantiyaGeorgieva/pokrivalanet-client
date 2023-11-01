import React from 'react';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle';
import BillTo from './BillTo';
import InvoiceNo from './InvoiceNo';
import InvoiceItemsTable from './InvoiceItemsTable';
import InvoiceThankYouMsg from './InvoiceThankYouMsg';

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

const Invoice = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <BillTo invoice={invoice} />
      <InvoiceTitle title="Оферта" />
      <InvoiceNo invoice={invoice} />
      <InvoiceItemsTable invoice={invoice} />
      <InvoiceThankYouMsg />
    </Page>
  </Document>
);

export default Invoice;