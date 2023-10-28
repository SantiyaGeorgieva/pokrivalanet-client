import React from 'react';
import { Font, Page, Text, View, Document, StyleSheet, Image, Svg, Line } from '@react-pdf/renderer';
import Logo from '../../images/logo.png'

Font.register({
  family: 'RobotoSans',
  src:
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.1/fonts/roboto/Roboto-Regular.ttf',
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 20
  },
  image: {
    width: '15%',
    marginRight: 30,
    paddingRight: 15,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    fontSize: 12,
    marginRight: 30,
    paddingRight: 15,
  },
  text: {
    marginBottom: 2,
    fontFamily: 'RobotoSans',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});

function Pdf() {
  return (<Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>гр. Русе, ул."Тракция" 10</Text>
        <Text style={styles.text}>tel: + 359 877 614 031</Text>
        <Text style={styles.text}>{' '}{' '}{' '}{' '}{' '}{' '}+ 359 877 614 029</Text>
        <Text style={styles.text}>{' '}{' '}{' '}{' '}{' '}{' '}+ 359 877 062 082</Text>
        <Text>email: office@pokrivala.net</Text>
      </View>
      <View style={styles.image}>
        <Image src={Logo} />
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>оферта</Text>
      </View>
    </Page>
  </Document>
  )
}

export default Pdf;