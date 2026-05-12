import {View, Text, Platform, FlatList} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useCart } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';

const CartScreen = () => {
  const { items, total } = useCart();
  return (
    <View style={{padding: 10 }}>
      <FlatList 
      data={items} 
      renderItem={({item}) => <CartListItem cartItem={item} />} 
      contentContainerStyle={{ padding: 10, gap: 5 }}
      />

      {/* This allows the status bar to adapt its style based on the platform (iOS or Android). On iOS, it will use a light style, while on Android, it will automatically adjust based on the device's theme settings. To see battery, time, and other status icons clearly, especially when the background color of the app is light, using a light status bar style on iOS is recommended. */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <Text style={{marginTop: 20, fontSize: 20, fontWeight: '500' }}>Total: £{total}</Text>

      <Button text="Checkout" onPress={() => {}} />

      <Text>{items.length} items in cart</Text>
    </View>
  );
};

export default CartScreen;