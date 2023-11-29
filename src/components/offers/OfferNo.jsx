import React, { Fragment } from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { useTranslation } from "react-i18next";
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
  offerNoTitle: {
    fontSize: 12,
    fontStyle: 'bold',
    textAlign: 'left',
    justifyContent: 'flex-start'
  },
  label: {
    fontFamily: 'Roboto',
    width: 60
  }
});

const OfferNo = ({ offerNoTitle, offerNo, offerDateTitle }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <View style={styles.invoiceNoContainer}>
        <Text style={styles.label}>{`${t(offerNoTitle)}`}</Text>
        <Text style={styles.offerNoTitle}>{offerNo}</Text>
      </View>
      <View style={styles.invoiceDateContainer}>
        <Text style={styles.label}>{`${t(offerDateTitle)}`}</Text>
        <Text>{new Date().toLocaleDateString("ro-RO")}</Text>
      </View >
    </Fragment>
  )
};

export default OfferNo;