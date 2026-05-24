import { FlatList } from 'react-native';
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import { Stack } from 'expo-router';

export default function OrdersScreen() {
    return (
        <>
        <Stack.Screen options={{ title: 'Archive' }} />
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ padding: 10, gap: 10 }}

        />
        </>
    );
}