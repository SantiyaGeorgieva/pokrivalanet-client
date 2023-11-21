import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { useTranslation } from "react-i18next";

import Roboto from '../../fonts/roboto/Roboto-Regular.ttf';

Font.register({ family: 'Roboto', fonts: [{ src: Roboto, fontWeight: 'bold' }] });

const styles = StyleSheet.create({

  titleContainer: {
    flexDirection: 'row',
    marginTop: 12
  },
  reportTitle: {
    fontFamily: 'Roboto',
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  }
});

const OfferThankYouMsg = ({ message }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.reportTitle}>{`${t(message)}`}</Text>
    </View>
  )
};

export default OfferThankYouMsg;