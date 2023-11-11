import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import OfferTableHeader from './OfferTableHeader'
import OfferTableRow from './OfferTableRow'
import OfferTableBlankSpace from './OfferTableBlankSpace'
import OfferTableFooter from './OfferTableFooter'

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
  },
});

const OfferItemsTable = ({ invoice }) => (
  <View style={styles.tableContainer}>
    <OfferTableHeader />
    <OfferTableRow items={invoice.items} />
    <OfferTableBlankSpace rowsCount={tableRowsCount - invoice.items.length} />
    <OfferTableFooter items={invoice.items} />
  </View>
);

export default OfferItemsTable;