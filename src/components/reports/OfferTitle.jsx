import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { useTranslation } from "react-i18next";
import Roboto from '../../fonts/roboto/Roboto-Regular.ttf';

Font.register({ family: 'Roboto', fonts: [{ src: Roboto, fontWeight: 'bold' }] });

const styles = StyleSheet.create({
  titleContainer: {
    fontFamily: 'Roboto',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -120,
  },
  reportTitle: {
    fontFamily: 'Roboto',
    letterSpacing: 4,
    fontSize: 25,
    textAlign: 'center',
    textTransform: 'uppercase',
  }
});

const OfferTitle = ({ title }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.reportTitle}>{`${t(title)}`}</Text>
    </View>
  )
};

export default OfferTitle;