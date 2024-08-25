import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { imageMap } from '../../data/DataPizza'
import { useNavigation } from '@react-navigation/native'

export default function PizzaPage({ route }) {

    const navigate = useNavigation()
    const { item } = route.params
    const [sizeButtonActive, setSizeButtonActive] = useState(1)
    const [doughButtonActive, setDoughButtonActive] = useState(0)
    const [resultPrice, setResultPrice] = useState(item.price)

    const sizePizza = [
        {
            name: 'Маленькая',
            markup: 200
        },
        {
            name: 'Средняя',
            markup: 200
        },
        {
            name: 'Большая',
            markup: 200
        }
    ]

    const closePage = () => {
        navigate.goBack()
    }

    const doughPizza = [
        { name: 'Традиционное' },
        { name: 'Тонкое' }
    ]

    const activeSize = (index) => {
        setSizeButtonActive(index)
    }

    const activeDough = (index) => {
        setDoughButtonActive(index)
    }

    useEffect(() => {
        resultPriceFun()
    }, [activeSize])

    const resultPriceFun = () => {

        let price = item.price
        let result

        if (sizeButtonActive === 0) {
            result = price - sizePizza[sizeButtonActive].markup
        } else if (sizeButtonActive === 2) {
            result = price + sizePizza[sizeButtonActive].markup
        } else {
            result = price
        }

        setResultPrice(result)

    }

    return (

        <View style={stylePizzaPage.container}>
            <TouchableWithoutFeedback onPress={() => closePage()}>
                <Image
                    source={require('../../img/close.png')}
                    style={stylePizzaPage.close}></Image>
            </TouchableWithoutFeedback>
            <Text style={stylePizzaPage.name}>{item.name}</Text>
            <View style={stylePizzaPage.imageBlock}>
                <Image
                    source={imageMap[item.imageUrl]}
                    style={stylePizzaPage.image} />
            </View>
            <View style={stylePizzaPage.choicePizza}>
                <View style={stylePizzaPage.sizePizza}>
                    {sizePizza.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => activeSize(index)}>
                                <View
                                    style={sizeButtonActive === index ? stylePizzaPage.sizePizzaItemActive : stylePizzaPage.sizePizzaItem}
                                    key={index}>
                                    <Text style={sizeButtonActive === index ? stylePizzaPage.sizePizzaItemActiveText : stylePizzaPage.sizePizzaItemText}>
                                        {item.name}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })}
                </View>
                <View style={stylePizzaPage.sizePizza}>
                    {doughPizza.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => activeDough(index)}>
                                <View
                                    style={doughButtonActive === index ? stylePizzaPage.sizePizzaItemActive : stylePizzaPage.sizePizzaItem}
                                    key={index}>
                                    <Text style={doughButtonActive === index ? stylePizzaPage.sizePizzaItemActiveText : stylePizzaPage.sizePizzaItemText}>
                                        {item.name}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })}
                </View>
            </View>
            <View style={stylePizzaPage.designButton}>
                <Text style={stylePizzaPage.designButtonText}>В корзину за {resultPrice}тг</Text>
            </View>
        </View>

    )

}

const stylePizzaPage = StyleSheet.create({
    close: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 55,
        left: 20,
        zIndex: 10
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 60
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
    },
    choicePizza: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
        flexDirection: 'column',
    },
    sizePizza: {
        width: '90%',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgb(254, 95, 30)',
        borderRadius: 30,
        paddingVertical: 3,
        paddingHorizontal: 4,
        marginBottom: 10
    },
    sizePizzaItem: {
        flex: 1,
        justifyContent: 'center',
    },
    sizePizzaItemActive: {
        flex: 1,
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
        borderRadius: 20
    },
    sizePizzaItemText: {
        textAlign: 'center',
        fontSize: 19,
        color: 'white',
    },
    sizePizzaItemActiveText: {
        textAlign: 'center',
        fontSize: 19,
        color: 'rgb(254, 95, 30)',
    },
    designButton: {
        width: '90%',
        height: 60,
        backgroundColor: 'rgb(254, 95, 30)',
        position: 'absolute',
        bottom: 30,
        left: '5%',
        borderRadius: 30,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    designButtonText: {
        color: 'white',
        fontSize: 22
    }
})