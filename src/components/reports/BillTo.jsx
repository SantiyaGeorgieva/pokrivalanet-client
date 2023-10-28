import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36
  }
});

const BillTo = ({ invoice }) => (
  <View style={styles.headerContainer}>
    <Text>{invoice.company}</Text>
    <Text>{invoice.address}</Text>
    <Text>tel: {invoice.phone}</Text>
    <Text>email: {invoice.email}</Text>
  </View>
);

export default BillTo;