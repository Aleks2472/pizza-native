import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState, useEffect, useContext } from 'react'
import Home from '../home/Home'
import Cart from '../cart/Cart'
import Menu from '../menu/Menu'
import PizzaPage from '../pizza-page/PizzaPage'
import User from '../user/User'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { MyContext } from '../../App'
import Login from '../login/Login'

export default function Navigate() {

    const contextValue = useContext(MyContext)
    const Stack = createNativeStackNavigator();
    const [isMenuVisible, setIsMenuVisible] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            const currentRoute = navigation.getCurrentRoute();
            if (currentRoute) {
                const currentRouteName = currentRoute.name;
                setIsMenuVisible(currentRouteName !== 'PizzaPage');
            }
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <>
            {contextValue.login === true ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='Home' component={Home} />
                    <Stack.Screen name='Cart' component={Cart} />
                    <Stack.Screen name='PizzaPage' component={PizzaPage} />
                    <Stack.Screen name='User' component={User} />
                </Stack.Navigator>
            ) : (
                <Login></Login>
            )}
            {contextValue.login === true ? isMenuVisible && <Menu /> : null}
        </>
    );
}