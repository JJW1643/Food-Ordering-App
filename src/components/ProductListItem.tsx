import Colors from '@/src/constants/Colors';
import { StyleSheet, Text, View, Image } from 'react-native';


// Get the first product from the products array



// Customm component to display a product in a list

const ProductListItem = ({ product }) => {
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
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