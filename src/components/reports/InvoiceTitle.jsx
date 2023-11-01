import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
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

const InvoiceTitle = ({ title }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.reportTitle}>{title}</Text>
  </View>
);

export default InvoiceTitle;