import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Button from '@/src/components/Button';
import { Link, Stack } from 'expo-router';
import { useState } from 'react';
import Colors from '@/src/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const SignInScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const resetFields = () => {
        setEmail('');
        setPassword('');
        setShowPassword(false);
    }

    const validateInputs = () => {
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return false;
        }

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }

        // Password must be at least 8 characters, contain a number and a special character
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters and include a number and special character');
            return false;
        }

        return true;
    };

    const onSignIn = () => {

        if (!validateInputs()) {
            return;
        }
        console.warn('Signing in with:', { email, password });

        // Save in the database

        resetFields();
    }

    return (
        <View style={styles.container}>

            <Stack.Screen options={{ title: 'Sign In' }} />

            <Text style={styles.label}>Email</Text>
            <TextInput 
                placeholder='john@example.com'
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
            <TextInput 
                placeholder='Enter your password'
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
            
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color = 'gray'
                />
            </TouchableOpacity>
            </View>

            <Text style={{color: 'red'}}>{error}</Text>
            <Button onPress={onSignIn} text={ 'Sign In' } />
            <Link href={'/sign-up'} asChild>
                <Text style={styles.signup}>Don't have an account? Sign Up</Text>
            </Link>
                
        </View>
    )

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

    textButton: {
        color: Colors.light.tint,
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },

    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
    },

    passwordInput: {
        flex: 1,
        padding: 10,
    },

    signup: {
        color: Colors.light.tint,
        marginTop: 5,
        alignSelf: 'center',
    },

}); 



export default SignInScreen;