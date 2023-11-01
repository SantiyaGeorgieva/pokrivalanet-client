import React from 'react';
import { Text, View, StyleSheet, Font, Image, Svg, Line } from '@react-pdf/renderer';
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

const BillTo = ({ invoice }) => (
  <View>
    <View style={styles.headerContainer}>
      <Image style={styles.logo} src={Logo} />
      <View style={styles.header}>
        <Text>{invoice.company}</Text>
        <Text>{invoice.address}</Text>
        <Text>tel: {invoice.phone}</Text>
        <Text>email: {invoice.email}</Text>
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
      {/* <InvoiceTitle title="Оферта" /> */}
    </View>
  </View>
);

export default BillTo;