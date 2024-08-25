import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, Platform } from 'react-native'

export default function Menu() {

    const [activePage, setActivePage] = useState('Home')

    const navigation = useNavigation()

    const openPage = (page) => {
        setActivePage(page)
        navigation.navigate(page)
    }

    return (

        <View style={styleMenu.container}>
            <TouchableWithoutFeedback onPress={() => openPage('Home')}>
                <Image
                    source={activePage === 'Home' ? require('../../img/menu/home-active.png') :
                        require('../../img/menu/home.png')}
                    style={styleMenu.icon} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => openPage('Cart')}>
                <Image
                    source={activePage === 'Cart' ? require('../../img/menu/cart-active.png') :
                        require('../../img/menu/cart.png')}
                    style={styleMenu.icon} />
            </TouchableWithoutFeedback>
            <Image
                source={require('../../img/menu/user.png')}
                style={styleMenu.icon} />
        </View>

    )

}

const styleMenu = StyleSheet.create({
    container: {
        width: '100%',
        height: Platform.OS === 'ios' ? 90 : 60,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    icon: {
        width: 35,
        height: 35
    }
})