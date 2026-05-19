import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {View, Text, Image, StyleSheet, Pressable, FlatList} from 'react-native';
import orders from '@/assets/data/orders';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import Colors from '@/src/constants/Colors';
import OrderListItem from '@/src/components/OrderListItem';
import { OrderStatusList } from '@/src/types';


const OrderDetailsScreen = () => {

    // Get the order ID from the URL parameters using the useLocalSearchParams hook. This allows us to identify which order's details we want to display.
    const { id } = useLocalSearchParams();

    // Find the order with the matching ID from the orders array. 

    const order = orders.find(o => o.id.toString() === id);

    if (!order) {
        return <Text>Order not found</Text>;
    }

    // Display the specific order and its details: The order id, the time it was placed, the status, the products in the order, products prices and sized, the number of items, and the total price.

    return (

        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${order.id}` }} />

            <OrderListItem order={order} />

            <FlatList
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ padding: 10, gap: 10 }}
                ListFooterComponent={() => <>
                    <Text style={{ fontWeight: 'bold' }}>Status</Text>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        {OrderStatusList.map((status) => (
                        <Pressable
                            key={status}
                            onPress={() => console.warn('Update status')}
                            style={{
                            borderColor: Colors.light.tint,
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 5,
                            marginVertical: 10,
                            backgroundColor:
                                order.status === status
                                ? Colors.light.tint
                                : 'transparent',
                            }}
                            >
                            <Text
                            style={{
                                color:
                                order.status === status ? 'white' : Colors.light.tint,
                            }}
                            >
                            {status}
                            </Text>
                        </Pressable>
                        ))}
                    </View>
                    </>
                    }
            />
        </View>
    );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        gap: 10,
    },


});