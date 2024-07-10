import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ImageBackground, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Logo = require('./assets/Logo.png');
const Search = require('./assets/Search.png');
const Bag = require('./assets/shoppingBag.png');
const List = require('./assets/Listview.png');
const Filter = require('./assets/Filter.png');
const Add = require('./assets/add_circle.png');

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const cartItems = await AsyncStorage.getItem('cartItems');
      let items = cartItems ? JSON.parse(cartItems) : [];
      items.push(product);
      await AsyncStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const categories = {
    Clothing: products.filter((product) => product.category === "men's clothing" || product.category === "women's clothing"),
    Electronics: products.filter((product) => product.category === "electronics"),
    Jewelry: products.filter((product) => product.category === "jewelery"),
    Shoes: products.filter((product) => product.category === "shoes"),
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.productImage} source={Logo} />
        <View style={styles.iconContainer}>
          <Image style={styles.productIcon} source={Search} />
          <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
            <Image style={styles.productIcon} source={Bag} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subheader}>
        <Text style={styles.text}>O U R   S T O R Y</Text>
        <View style={styles.icon}>
          <Image style={styles.icons} source={List} />
          <Image style={styles.icons} source={Filter} />
        </View>
      </View>

      {Object.keys(categories).map((category) => (
        <View key={category} style={styles.category}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <View style={styles.products}>
            {categories[category].map((product, index) => (
              <View key={product.id} style={[styles.productBlock, (index % 2 !== 0) && { marginLeft: 10 }]}>
                <ImageBackground style={styles.dresses} source={{ uri: product.image }}>
                  <TouchableOpacity onPress={() => addToCart(product)}>
                    <Image style={styles.tag} source={Add} />
                  </TouchableOpacity>
                </ImageBackground>
                <Text style={styles.first}>{product.title}</Text>
                <Text style={styles.next}>{product.description}</Text>
                <Text style={styles.last}>${product.price}</Text>
                <Button
                  title="Details"
                  onPress={() => navigation.navigate('ProductDetails', { product })}
                />
              </View>
            ))}
          </View>
        </View>
      ))}

      <Button
        title="Go to Cart"
        onPress={() => navigation.navigate('Cart')}
        style={styles.cartButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
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
  text: {
    fontSize: 25,
    marginTop: 10,
  },
  subheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  icon: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icons: {
    marginBottom: 8,
    marginLeft: 20,
  },
  category: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  productBlock: {
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
  },
  dresses: {
    marginTop: 10,
    marginBottom: 8,
    width: 170,
    height: 220,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  tag: {
    width: 20,
    height: 20,
    margin: 5,
  },
  first: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
  },
  next: {
    fontSize: 15,
    opacity: 0.6,
    textAlign: 'left',
  },
  last: {
    color: '#CC5801',
    textAlign: 'left',
  },
  cartButton: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
