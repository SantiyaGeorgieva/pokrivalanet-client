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
    marginTop: -145,
  },
  offerTitle: {
    fontFamily: 'Roboto',
    letterSpacing: 4,
    fontSize: 25,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 13,
    textAlign: 'center'
  }
});

const OfferTitle = ({ offerTitle, title }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.offerTitle}>{`${t(offerTitle)}`}</Text>
      <Text style={styles.title}>{`${t(title)}`}</Text>
    </View>
  )
};

export default OfferTitle;