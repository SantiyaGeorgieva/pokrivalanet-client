import React from 'react';
import { Text, View, Font, StyleSheet } from '@react-pdf/renderer';
import { useTranslation } from "react-i18next";
import Roboto from '../../fonts/roboto/Roboto-Regular.ttf';

Font.register({ family: 'Roboto', src: Roboto, fontStyle: 'normal', fontWeight: 'normal' });

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto',
    fontSize: 13,
    textAlign: 'left',
    marginTop: 25,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1
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
  },
  footerText: {
    fontFamily: 'Roboto',
    marginTop: 15,
    fontSize: 12,
    fontWeight: 'bold'
  }
});

const OfferTable = ({ items, parametersText, totalPrice, title }) => {
  const { t } = useTranslation();

  function filterProperties(arr) {
    const filteredArray = arr.map(obj => {
      const { names, email, telephone, ...rest } = obj;
      return rest;
    });
    return filteredArray;
  }

  const filteredItems = filterProperties(items);

  return (
    <View>
      <Text style={styles.title}>{`${t(parametersText)}`}</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{t('type')}</Text>
          </View>
          <View style={styles.tableCol2}>
            <Text style={styles.tableCell}>{t('amount')}</Text>
          </View>
        </View>
        {filteredItems?.map(item => {
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
      {t(title) === t('offer_windproof_curtain') && <View>
        <Text style={styles.footerText}>
          {t('offer_footer_text')}
        </Text>
      </View>}
    </View>
  )
};

export default OfferTable;