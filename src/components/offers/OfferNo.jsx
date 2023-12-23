import React, { Fragment } from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { useTranslation } from "react-i18next";
import Roboto from '../../fonts/roboto/Roboto-Regular.ttf';

Font.register({ family: 'Roboto', fonts: [{ src: Roboto, fontWeight: 'bold' }] });

const styles = StyleSheet.create({
  invoiceNoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    fontFamily: 'Roboto'
  }
});

const OfferNo = ({ offerNoTitle, offerNo, offerDateTitle, items }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <View style={styles.invoiceNoContainer}>
        <View>
          <View>
            <Text>{t('names')}: {items.names}</Text>
          </View>
          <View>
            <Text>{t('email')}: {items.email}</Text>
          </View>
          <View>
            <Text>{t('telephone')}: {items.telephone}</Text>
          </View>
        </View>
        <View>
          <View>
            <Text>{`${t(offerNoTitle)}`} {offerNo}</Text>
          </View>
          <View>
            <Text>{`${t(offerDateTitle)}`} {new Date().toLocaleDateString("ro-RO")}</Text>
          </View>
        </View>
      </View>
    </Fragment>
  )
};

export default OfferNo;