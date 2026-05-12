import { View, Text, StyleSheet, TextInput } from 'react-native';
import Button  from '@/src/components/Button';
import { useState } from 'react';

const CreateProductScreen = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const resetFields = () => {
        setName('');
        setPrice('');
    }

    const onCreate = () => {
        console.warn('Creating product', name, price);

        // Save in the database

        resetFields();
    }

  return (
    <View style={styles.container}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput 
        placeholder='Name' 
        style={styles.input} 
        value={name}
        onChangeText={setName}
        />

        <Text style={styles.label}>Price (£)</Text>
        <TextInput 
        placeholder='9.99' 
        style={styles.input} 
        value={price}
        keyboardType='numeric' 
        onChangeText={setPrice}
        />

        <Button onPress={onCreate} text='Create' />

    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },

    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 20,
    },


    label: {
        color: 'gray',
        fontSize: 16,
    },

});   




export default CreateProductScreen;