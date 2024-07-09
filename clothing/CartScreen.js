import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cartItems');
        if (cartData) {
          setCartItems(JSON.parse(cartData));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  const removeItem = async (index) => {
    try {
      const updatedItems = cartItems.filter((item, i) => i !== index);
      setCartItems(updatedItems);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = async () => {
    try {
      setCartItems([]);
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // Optionally, you can navigate to a specific screen if there's no screen to go back to
      navigation.navigate('Home');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              {/* Ensure the image URI is a string */}
              <Image source={{ uri: String(item.image) }} style={styles.cartItemImage} />
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.title}</Text>
                <Text style={styles.cartItemPrice}>${item.price}</Text>
                <Button title="Remove" onPress={() => removeItem(index)} />
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        )}
        {cartItems.length > 0 && (
          <Button title="Clear Cart" onPress={clearCart} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: 'blue',
    fontSize: 18,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cartItemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 16,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#CC5801',
    marginVertical: 8,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CartScreen;
