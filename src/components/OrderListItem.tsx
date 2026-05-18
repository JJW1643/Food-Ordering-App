import { Order } from '../types';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import { Link, useSegments } from 'expo-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';

dayjs.extend(relativeTime);

type OrderListItemProps = {
    order: Order;
};

// Custom component to display an order in a list, showing the order number and total price. Tapping on it navigates to the order details screen.

const OrderListItem = ({ order }: OrderListItemProps) => {
    const segments = useSegments();

    return (
        <Link href={`/${segments[0]}/orders/${order.id}` as any} asChild>
            <Pressable style={styles.container}>
                <View>
                    <Text style={styles.title}>Order #{order.id}</Text>
                    <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
                </View>
                <Text style={styles.status}>{order.status}</Text>
            </Pressable>
        </Link>
    );
};

export default OrderListItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    status: {
        fontSize: 17,
        fontWeight: '500',
        color: 'black',
    },

    time: {
        fontSize: 14,
        color: 'gray',
    },
}); 