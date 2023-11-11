import React from 'react';
import { Text, View, StyleSheet, Font, Image, Svg, Line } from '@react-pdf/renderer';
import { useTranslation } from "react-i18next";
import Roboto from '../../fonts/roboto/Roboto-Regular.ttf';
import Logo from '../../images/logo.png';

Font.register({ family: 'Roboto', fonts: [{ src: Roboto, fontWeight: 'bold' }] });

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    fontFamily: 'Roboto',
    justifyContent: 'space-between',
  },
  header: {
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    width: '20%'
  }
});

const OfferBillTo = ({ invoice }) => {
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.headerContainer}>
        <Image style={styles.logo} src={Logo} />
        <View style={styles.header}>
          <Text>{`${t('company_name')}`}</Text>
          <Text>{`${t('addres_ruse')}`}</Text>
          <Text>tel: {`${t('phone')}`}</Text>
          <Text>email: {`${t('email_office')}`}</Text>
        </View>
      </View>
      <View>
        <Svg height="200" width="800">
          <Line
            x1="0"
            y1="15"
            x2="480"
            y2="15"
            strokeWidth={0.5}
            stroke="rgb(0,0,0)"
          />
        </Svg>
      </View>
    </View>
  )
};

export default OfferBillTo;