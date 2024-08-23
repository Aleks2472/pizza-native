import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { imageMap } from '../../data/DataPizza'

export default function PizzaPage({ route }) {

    const { item } = route.params

    return (

        <View style={stylePizzaPage.container}>
            <Text style={stylePizzaPage.name}>{item.name}</Text>
            <View style={stylePizzaPage.imageBlock}>
                <Image
                    source={imageMap[item.imageUrl]}
                    style={stylePizzaPage.image} />
            </View>
        </View>

    )

}

const stylePizzaPage = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 70
    },
    name: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 20,
    },
    imageBlock: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'cover',
    }
})