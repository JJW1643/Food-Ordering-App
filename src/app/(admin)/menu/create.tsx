import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import Button  from '@/src/components/Button';
import { useState } from 'react';
import { parse } from 'expo-linking';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { Stack } from 'expo-router';

const CreateProductScreen = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    // A state variable to keep track of any validation errors that may occur when the user tries to create a new product. It is initialized as an empty string and can be updated with error messages if the validation fails.

    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const resetFields = () => {
        setName('');
        setPrice('');
    }

    const validateInputs = () => {
        setErrors('');
        if (!name) {
            setErrors('Name is required');
            return false;
        }
        
        if (!price) {
            setErrors('Price is required');
            return false;
        }
        
        // The parseFloat function is used to convert the price string into a floating-point number. If the conversion fails (e.g., if the input is not a valid number), parseFloat will return NaN (Not-a-Number). The isNaN function is then used to check if the result of parseFloat is NaN, which indicates that the input was not a valid number. If this is the case, an error message is set and the function returns false to indicate that validation has failed.
        if (isNaN(parseFloat(price))) {
            setErrors('Price must be a number');
            return false;
        }
        return true;
    }

    const onCreate = () => {

        if (!validateInputs()) {
            return;
        }
        console.warn('Creating product', name, price);

        // Save in the database

        resetFields();
    }


    // This function is responsible for allowing the user to pick an image from their device's media library. 

    const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>

        <Stack.Screen options={{ title: 'Create Product' }} />

        <Image 
        source={{ uri: image ||defaultPizzaImage }} 
        style={styles.image} 
        />

        <Text onPress={pickImage}style={styles.textButton}>Select Image</Text>

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

        <Text style={{color: 'red'}}>{errors}</Text>
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

    image: {
        width: '50%',
        aspectRatio: 1,
        marginBottom: 20,
        alignSelf: 'center',
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

    textButton: {
        color: Colors.light.tint,
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },

});   




export default CreateProductScreen;