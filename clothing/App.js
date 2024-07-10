import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ProductDetailScreen from './ProductDetailScreen';
import CartScreen from './CartScreen';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomDrawerContent = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.drawerHeader}>
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <Image source={require('./assets/Menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.drawerTitle}>Categories</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.drawerItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Category', { category: 'Clothing' })}>
        <Text style={styles.drawerItem}>Clothing</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Category', { category: 'Electronics' })}>
        <Text style={styles.drawerItem}>Electronics</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Category', { category: 'Jewelry' })}>
        <Text style={styles.drawerItem}>Jewelry</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Category', { category: 'Shoes' })}>
        <Text style={styles.drawerItem}>Shoes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerItem: {
    padding: 16,
    fontSize: 16,
  },
});

export default App;
