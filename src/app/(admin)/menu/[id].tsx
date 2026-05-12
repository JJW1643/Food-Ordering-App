import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import {useState} from 'react';
import Button  from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';

// The sizes available for the product, which can be used to display size options in the UI. This is a simple array.

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {

  const { id } = useLocalSearchParams();
  const { addItem } = useCart();

  const router = useRouter();

  // A state variable to keep track of the selected size for the product. It is initialized to 'M' (Medium) and can be updated when the user selects a different size.

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  // Find the product with the matching id from the products array

  const product = products.find(p => p.id.toString() === id);

  const addToCart = () => {
    addItem(product!, selectedSize);
    router.push('/cart');
  }

  // If no product is found, display a message

  if (!product) {
    return <Text>Product not found</Text>;
  }

  // Display the specific product name and its price

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || defaultPizzaImage }} 
      style={ styles.image } />

      

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>£{product.price}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  
  image:{
    width: '100%',
    aspectRatio: 1,
  },

  title:{
    fontSize: 20,
    fontWeight: 'bold',

  },

  price:{
    fontSize: 18,
    fontWeight: '400',

  },

});

export default ProductDetailsScreen;