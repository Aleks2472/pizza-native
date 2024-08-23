import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Menu from '../menu/Menu'

export default function Cart() {

    return (

        <View style={styleCart.container}>
            <Text>Cart</Text>
        </View>

    )

}

const styleCart = StyleSheet.create({
    container: {
        flex: 1
    }
})