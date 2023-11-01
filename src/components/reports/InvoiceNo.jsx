import React, { Fragment } from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import Roboto from '../../fonts/roboto/Roboto-Regular.ttf';

Font.register({ family: 'Roboto', fonts: [{ src: Roboto, fontWeight: 'bold' }] });

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'flex-end'
  },
  invoiceDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: 'bold',
  },
  label: {
    fontFamily: 'Roboto',
    width: 60
  }
});

const InvoiceNo = ({ invoice }) => (
  <Fragment>
    <View style={styles.invoiceNoContainer}>
      <Text style={styles.label}>Оферта No: </Text>
      <Text style={styles.invoiceDate}>{invoice?.invoice_no}</Text>
    </View>
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Date: </Text>
      <Text>{invoice.trans_date}</Text>
    </View >
  </Fragment>
);

export default InvoiceNo;