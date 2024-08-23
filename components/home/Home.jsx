import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableWithoutFeedback } from 'react-native'
import { dataPizza, imageMap } from '../../data/DataPizza'
import Menu from '../menu/Menu'
import { useNavigation } from '@react-navigation/native'

export default function Home() {

    const navigation = useNavigation()

    const openCart = (item) => {
        navigation.navigate('PizzaPage', {item})
    }

    return (

        <View style={styleHome.container}>
            <View style={styleHome.header}>
                <TextInput
                    style={styleHome.search}
                    placeholder='Поиск...'></TextInput>
                <View style={styleHome.filter}>
                    <View style={styleHome.button}>
                        <Image
                            style={styleHome.buttonImage}
                            source={require('../../img/filter/sort.png')} />
                        <Text
                            style={styleHome.buttonText}>Сортировка</Text>
                    </View>
                    <View style={styleHome.button}>
                        <Image
                            style={styleHome.buttonImage}
                            source={require('../../img/filter/filter.png')} />
                        <Text
                            style={styleHome.buttonText}>Фильтр</Text>
                    </View>
                </View>
            </View>
            <FlatList
                style={styleHome.content}
                data={dataPizza}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => openCart(item)}>
                        <View style={styleHome.card}>
                            <Image
                                source={imageMap[item.imageUrl]}
                                style={styleHome.cardImage}></Image>
                            <View style={styleHome.cardText}>
                                <Text style={styleHome.cardName}>{item.name}</Text>
                                <Text style={styleHome.cardDescription}>{item.description}</Text>
                                <Text style={styleHome.cardPrice}>От {item.price}тг</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )} />
        </View>

    )

}

const styleHome = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 90
    },
    header: {
        width: '100%',
        backgroundColor: 'rgb(254, 95, 30)',
        paddingTop: 70,
        paddingBottom: 20,
    },
    search: {
        width: '90%',
        height: 40,
        fontSize: '15px',
        paddingHorizontal: 10,
        margin: 'auto',
        borderRadius: 15,
        backgroundColor: 'white'
    },
    filter: {
        flexDirection: 'row',
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
        marginTop: 20
    },
    button: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15
    },
    buttonImage: {
        width: 20,
        height: 25,
        marginRight: 10
    },
    buttonText: {
        fontSize: 15
    },
    content: {
        flex: 1,
        paddingHorizontal: '5%',
        paddingTop: 30,
    },
    card: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        overflow: 'hidden',
    },
    cardImage: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        marginRight: 10
    },
    cardText: {
        flex: 1
    },
    cardName: {
        fontSize: 17,
        marginBottom: 5
    },
    cardDescription: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10
    },
    cardPrice: {
        fontSize: 17,
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
        borderRadius: 15,
        paddingHorizontal: 18,
        paddingVertical: 5,
        alignSelf: 'flex-start',
        overflow: 'hidden'
    }
})