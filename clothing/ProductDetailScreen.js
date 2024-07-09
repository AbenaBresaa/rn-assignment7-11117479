import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Menu = require('./assets/Menu.png');
const Logo = require('./assets/Logo.png');
const Search = require('./assets/Search.png');
const Bag = require('./assets/shoppingBag.png');
const Export = require('./assets/Export.png');
const Bleach = require('./assets/Bleach.png');
const Tumble = require('./assets/Tumble.png');
const Dry = require('./assets/Dry.png');
const Iron = require('./assets/Iron.png');
const car = require('./assets/Shipping.png');
const arrow = require('./assets/Up.png');

const ProductDetailScreen = () => {
  const route = useRoute();
  const { product } = route.params;

  return (
    <ScrollView>
      <View style={styles.header}>
        <Image style={styles.productImage} source={Menu} />
        <Image style={styles.productImage} source={Logo} />
        <View style={styles.iconContainer}>
          <Image style={styles.productIcon} source={Search} />
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image style={styles.productIcon} source={Bag} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contain}>
        <Image style={styles.image} source={{ uri: product.image }} />
        <View style={styles.top}>
          <Text style={styles.name}>{product.title}</Text>
          <Image style={styles.export} source={Export} />
        </View>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.info}>M A T E R I A L S</Text>
        <Text style={styles.description}>We work with monitoring programmes to ensure compliance with safety, health and quality standards for our products.</Text>
        <View style={styles.about}>
          <Image style={styles.icons} source={Bleach} />
          <Text style={styles.description}> Do not use bleach</Text>
        </View>
        <View style={styles.about}>
          <Image style={styles.icons} source={Tumble} />
          <Text style={styles.description}> Do not tumble dry</Text>
        </View>
        <View style={styles.about}>
          <Image style={styles.icons} source={Dry} />
          <Text style={styles.description}> Dry clean with tetrachloroethylene</Text>
        </View>
        <View style={styles.about}>
          <Image style={styles.icons} source={Iron} />
          <Text style={styles.description}> Iron at a maximum of 110C/230F</Text>
        </View>
        <View style={styles.about}>
          <Image style={styles.car} source={car} />
          <Text style={styles.last}> Free Flat Rate Shipping</Text>
          <Image style={styles.arrow} source={arrow} />
        </View>
        <View>
          <Text style={styles.time}> Estimated to be delivered on</Text>
          <Text style={styles.time}> 09/11/2021 - 12/11/2021.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  productImage: {
    marginBottom: 8,
  },
  productIcon: {
    marginBottom: 8,
    marginLeft: 20,
  },
  contain: {
    padding: 16,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  export: {
    width: 24,
    height: 24,
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
  },
  price: {
    fontSize: 24,
    color: '#CC5801',
    marginVertical: 8,
  },
  info: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  about: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  icons: {
    width: 24,
    height: 24,
  },
  car: {
    width: 24,
    height: 24,
    marginRight: 8,
    marginTop: 15,
  },
  last: {
    flex: 1,
    fontSize: 16,
    marginTop: 15,
  },
  arrow: {
    width: 24,
    height: 24,
    marginTop: 25,
  },
  time: {
    fontSize: 16,
    marginVertical: 8,
  },
});

export default ProductDetailScreen;
