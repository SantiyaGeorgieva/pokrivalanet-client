import React from 'react';
import { Text, View, Font, StyleSheet } from '@react-pdf/renderer';
import { useTranslation } from "react-i18next";
import Roboto from '../../fonts/roboto/Roboto-Regular.ttf';

Font.register({ family: 'Roboto', src: Roboto, fontStyle: 'normal', fontWeight: 'normal' });

// const styles = StyleSheet.create({
//   container: {
//     fontFamily: 'Roboto',
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     alignItems: 'center',
//     height: 24,
//     textAlign: 'center',
//     flexGrow: 1,
//   },
//   description: {
//     fontFamily: 'Roboto',
//     width: '70%',
//     borderRightWidth: 1,
//   },
//   amount: {
//     fontFamily: 'Roboto',
//     width: '30%'
//   },
// });

const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    // borderLeftWidth: 0,
    borderBottomWidth: 0,
    marginTop: 25,
    '&:last-child': {
      borderLeftWidth: 0,
    }
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    borderLeftWidth: 0,
    '&:last-child': {
      borderLeftWidth: 0,
    }
  },
  tableCol: {
    fontFamily: 'Roboto',
    width: "45%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    '&:last-child': {
      borderLeftWidth: 0,
    }
  },
  tableCol2: {
    fontFamily: 'Roboto',
    width: "55%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    fontFamily: 'Roboto',
    margin: "auto",
    marginTop: 5,
    fontSize: 13,
    fontWeight: 'bold'
  },
  rowTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    fontSize: 12,
    fontStyle: 'bold',
    borderLeftWidth: 0,
    marginTop: 15
  },
  descriptionTotal: {
    width: '80%',
    textAlign: 'right',
    paddingRight: 8,
    fontStyle: 'bold',
    borderLeftWidth: 0,
  },
  total: {
    width: '20%',
    textAlign: 'right',
    paddingRight: 8,
    fontStyle: 'bold',
    borderLeftWidth: 0,
  }
});

const OfferTable = ({ items, totalPrice, message }) => {
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{t('type')}</Text>
          </View>
          <View style={styles.tableCol2}>
            <Text style={styles.tableCell}>{t('amount')}</Text>
          </View>
        </View>
        {items?.map(item => {
          return (Object.keys(item).map(key => (
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{`${t(key)}`}</Text>
              </View>
              <View style={styles.tableCol2}>
                {(typeof +item[key] !== 'string' && item[key] !== '') ?
                  <Text style={styles.tableCell}>{t(item[key])}</Text>
                  : <Text style={styles.tableCell}>-</Text>
                }
              </View>
            </View>
          )))
        }
        )}
      </View>
      <View style={styles.rowTotal}>
        <Text style={styles.descriptionTotal}>TOTAL</Text>
        <Text style={styles.total}>{totalPrice} BGN</Text>
      </View>
    </View>
  )
};

export default OfferTable;