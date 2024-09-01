import { useNavigation } from '@react-navigation/native'
import React, { useState, useContext } from 'react'
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, Platform } from 'react-native'
import { MyContext } from '../../App'

export default function Menu() {

    const contextValue = useContext(MyContext)

    const [activePage, setActivePage] = useState('Home')

    const navigation = useNavigation()

    const openPage = (page) => {
        setActivePage(page)
        navigation.navigate(page)
    }

    return (

        <View style={[styleMenu.container, { backgroundColor: contextValue.them }]}>
            <TouchableWithoutFeedback onPress={() => openPage('Home')}>
                <Image
                    source={activePage === 'Home' ? require('../../img/menu/home-active.png') :
                        contextValue.them !== 'white' ? require('../../img/menu/home-white.png') :
                            require('../../img/menu/home.png')}
                    style={styleMenu.icon} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => openPage('Cart')}>
                <View style={styleMenu.cartButton}>
                    <Image
                        source={activePage === 'Cart' ? require('../../img/menu/cart-active.png') :
                            contextValue.them !== 'white' ? require('../../img/menu/cart-white.png') :
                                require('../../img/menu/cart.png')}
                        style={styleMenu.icon} />
                    {contextValue.cartPage.length > 0 ? (
                        <View style={styleMenu.cartButtonTextBackground}>
                            <Text style={styleMenu.cartButtonText}>{contextValue.cartPage.length}</Text>
                        </View>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => openPage('User')}>
                <Image
                    source={activePage === 'User' ? require('../../img/menu/user-active.png') :
                        contextValue.them !== 'white' ? require('../../img/menu/user-white.png') :
                            require('../../img/menu/user.png')}
                    style={styleMenu.icon} />
            </TouchableWithoutFeedback>
        </View>

    )

}

const styleMenu = StyleSheet.create({
    container: {
        width: '100%',
        height: Platform.OS === 'ios' ? 90 : 60,
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
    },
    cartButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartButtonTextBackground: {
        minWidth: 10,
        minHeight: 10,
        backgroundColor: 'rgb(254, 95, 30)',
        marginLeft: 5,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    cartButtonText: {
        fontSize: 18,
        color: 'white'
    }
})