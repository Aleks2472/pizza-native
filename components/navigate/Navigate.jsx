import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import Home from '../home/Home'
import Cart from '../cart/Cart'
import Menu from '../menu/Menu'
import PizzaPage from '../pizza-page/PizzaPage'

export default function Navigate() {

    const Stack = createNativeStackNavigator()

    return (

        <>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name='Home'
                    component={Home}></Stack.Screen>
                <Stack.Screen
                    name='Cart'
                    component={Cart}></Stack.Screen>
                <Stack.Screen
                    name='PizzaPage'
                    component={PizzaPage}></Stack.Screen>
            </Stack.Navigator>
            <Menu></Menu>
        </>

    )

}