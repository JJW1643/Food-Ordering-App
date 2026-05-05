import Colors from '@/src/constants/Colors';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Product} from '../types';

export const defaultPizzaImage =
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';



type ProductListItemProps = {
    product: Product;
};



// Customm component to display a product in a list

const ProductListItem = ({ product }: ProductListItemProps) => {
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>£{product.price}</Text>
    </View>
  );
};

export default ProductListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.tint,
  }
});