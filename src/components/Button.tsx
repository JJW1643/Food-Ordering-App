import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { forwardRef } from 'react';

// A reusable button component that can be used throughout the app. It accepts a text prop for the button label and any other props that a Pressable component would accept.

type ButtonProps = {
  text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

// The forwardRef function allows this component to accept a ref that can be passed down to the Pressable component, enabling parent components to directly interact with the Pressable if needed.

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, ...pressableProps }, ref) => {
    return (
      <Pressable ref={ref} {...pressableProps} style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
);

// The styles for the button, including the container and text styles. The container has a background color, padding, alignment, border radius, and margin. The text style defines the font size, weight, and color.

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default Button;