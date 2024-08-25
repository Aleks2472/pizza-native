import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState, useEffect } from 'react'
import Home from '../home/Home'
import Cart from '../cart/Cart'
import Menu from '../menu/Menu'
import PizzaPage from '../pizza-page/PizzaPage'
import { useNavigation, useNavigationState } from '@react-navigation/native'

export default function Navigate() {

    const Stack = createNativeStackNavigator();
    const [isMenuVisible, setIsMenuVisible] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            const currentRouteName = navigation.getCurrentRoute().name;
            setIsMenuVisible(currentRouteName !== 'PizzaPage');
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Cart' component={Cart} />
                <Stack.Screen name='PizzaPage' component={PizzaPage} />
            </Stack.Navigator>
            {isMenuVisible && <Menu />}
        </>
    );
}