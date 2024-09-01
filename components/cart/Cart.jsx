import React, { useContext, useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View, SafeAreaView, Image, Platform } from 'react-native'
import Menu from '../menu/Menu'
import { MyContext } from '../../App'
import { imageMap } from '../../data/DataPizza'

export default function Cart() {

    const contextValue = useContext(MyContext)

    const [totalPrice, setTotalPrice] = useState(0)

    const calculateTotalPrice = () => {
        const total = contextValue.cartPage.reduce((sum, item) => {
            return sum + item.price
        }, 0)
        setTotalPrice(total)
    }

    useEffect(() => {
        calculateTotalPrice()
    }, [contextValue.cartPage])

    return (

        <SafeAreaView style={[styleCart.container, { backgroundColor: contextValue.them }]}>
            <View style={styleCart.lengthItem}>
                <Text style={[styleCart.lengthItemText, { color: contextValue.themText }]}>{contextValue.cartPage.length} товар на сумму {totalPrice}</Text>
            </View>
            <FlatList
                data={contextValue.cartPage}
                renderItem={({ item }) => (
                    <View style={styleCart.item}>
                        <View style={styleCart.description}>
                            <Image
                                source={imageMap[item.imageUrl]}
                                style={styleCart.image} />
                            <View>
                                <Text style={[styleCart.name, { color: contextValue.themText }]}>{item.name}</Text>
                                <Text style={styleCart.size}>{item.size}, {item.dough}</Text>
                            </View>
                        </View>
                        <View style={styleCart.itemBottom}>
                            <Text style={[styleCart.price, { color: contextValue.themText }]}>{item.price}тг</Text>
                            <View style={styleCart.itemButton}>
                                <Text style={[styleCart.itemButtonText, { color: contextValue.themText }]}>-</Text>
                                <Text style={[styleCart.itemButtonText, styleCart.itemButtonLength, { color: contextValue.themText }]}>1</Text>
                                <Text style={[styleCart.itemButtonText, { color: contextValue.themText }]}>+</Text>
                            </View>
                        </View>
                    </View>
                )}></FlatList>
        </SafeAreaView>

    )

}

const styleCart = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: '100%',
        height: 200,
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,0.10)',
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingHorizontal: '5%'
    },
    description: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginRight: 20
    },
    name: {
        fontSize: 17,
        marginBottom: 5
    },
    size: {
        fontSize: 17,
        color: 'gray'
    },
    itemBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center'
    },
    price: {
        fontSize: 18
    },
    itemButton: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.10)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 50
    },
    itemButtonText: {
        fontSize: 18
    },
    itemButtonLength: {
        marginHorizontal: 20
    },
    lengthItem: {
        width: '100%',
        paddingHorizontal: '5%',
        paddingVertical: 25,
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,0.10)',
        borderBottomWidth: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : 50
    },
    lengthItemText: {
        fontSize: 20
    }
})