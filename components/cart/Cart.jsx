import React, { useContext } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Menu from '../menu/Menu'
import { MyContext } from '../../App'

export default function Cart() {

    const contextValue = useContext(MyContext)

    return (

        <View style={styleCart.container}>
            <FlatList
                data={contextValue.cartPage}
                renderItem={({ item }) => (
                    <Text>{item.name}</Text>
                )}></FlatList>
        </View >

    )

}

const styleCart = StyleSheet.create({
    container: {
        flex: 1
    }
})