import React, { useState, useEffect, useContext } from 'react'
import { Image, StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { dataPizza, imageMap, imageMapIngredient } from '../../data/DataPizza'
import { useNavigation } from '@react-navigation/native'
import { MyContext } from '../../App'

export default function PizzaPage({ route }) {

    const navigate = useNavigation()
    const contextValue = useContext(MyContext)
    const { item } = route.params
    const [sizeButtonActive, setSizeButtonActive] = useState(1)
    const [doughButtonActive, setDoughButtonActive] = useState(0)
    const [resultPriceSize, setResultPriceSize] = useState()
    const [ingredienPrice, setIngredienPrice] = useState(0)
    const [resultPrice, setResultPrice] = useState()
    const pizzaId = dataPizza.find(pizza => pizza.id === item.id)
    const [ingredientActive, setIngredientActive] = useState([])

    const sizePizza = [
        {
            name: 'Маленькая',
            markup: 1000
        },
        {
            name: 'Средняя'
        },
        {
            name: 'Большая',
            markup: 1000
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
    }, [sizeButtonActive])

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

        setResultPriceSize(result)

    }

    const ingredienButton = (index, price) => {
        if (ingredientActive.includes(index)) {
            setIngredientActive(ingredientActive.filter(i => i !== index))
            setIngredienPrice(ingredienPrice - price)
        } else {
            setIngredientActive([...ingredientActive, index])
            setIngredienPrice(ingredienPrice + price)
        }
    }

    useEffect(() => {
        setResultPrice(resultPriceSize + ingredienPrice)
    }, [ingredienButton, sizeButtonActive])

    const addItemCart = () => {

        const data = {
            name: item.name,
            imageUrl: item.imageUrl,
            dough: doughPizza[doughButtonActive].name,
            size: sizePizza[sizeButtonActive].name,
            price: resultPrice
        }

        contextValue.setCartPage(prevCart => [...prevCart, data])
        navigate.goBack()
    }

    return (

        <View style={stylePizzaPage.container}>
            <TouchableWithoutFeedback onPress={() => closePage()}>
                <Image
                    source={require('../../img/close.png')}
                    style={stylePizzaPage.close}></Image>
            </TouchableWithoutFeedback>
            <ScrollView>
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
                                <TouchableWithoutFeedback onPress={() => activeSize(index)} key={index}>
                                    <View
                                        style={sizeButtonActive === index ? stylePizzaPage.sizePizzaItemActive : stylePizzaPage.sizePizzaItem}>
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
                                <TouchableWithoutFeedback onPress={() => activeDough(index)} key={index}>
                                    <View
                                        style={doughButtonActive === index ? stylePizzaPage.sizePizzaItemActive : stylePizzaPage.sizePizzaItem}>
                                        <Text style={doughButtonActive === index ? stylePizzaPage.sizePizzaItemActiveText : stylePizzaPage.sizePizzaItemText}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })}
                    </View>
                </View>
                <View style={stylePizzaPage.ingredientContainer}>
                    <View style={stylePizzaPage.ingredient}>
                        {pizzaId.addProduct.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback onPress={() => ingredienButton(index, item.price)} key={index}>
                                    <View style={ingredientActive.includes(index) ? stylePizzaPage.ingredientItemActive : stylePizzaPage.ingredientItem}>
                                        <Image
                                            source={imageMapIngredient[item.imageUrl]}
                                            style={stylePizzaPage.ingredientImage} />
                                        <Text style={stylePizzaPage.ingredientName}>{item.name}</Text>
                                        <Text style={stylePizzaPage.ingredientPrice}>{item.price}тг</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
            <View style={stylePizzaPage.designButtonBackgrounf}>
                <TouchableWithoutFeedback onPress={() => addItemCart()}>
                    <View style={stylePizzaPage.designButton}>
                        <Text style={stylePizzaPage.designButtonText}>В корзину за {resultPrice}тг</Text>
                    </View>
                </TouchableWithoutFeedback>
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
    designButtonBackgrounf: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderTopColor: 'rgba(0,0,0,0.10)',
        borderTopWidth: 1,
        paddingVertical: 30
    },
    designButton: {
        width: '90%',
        height: 60,
        backgroundColor: 'rgb(254, 95, 30)',
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    designButtonText: {
        color: 'white',
        fontSize: 22
    },
    ingredientContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
        paddingBottom: 100
    },
    ingredient: {
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    ingredientItem: {
        width: '30%',
        height: 200,
        marginBottom: 50,
        marginRight: '3%',
        justifyContent: 'space-between',
        borderStyle: 'solid',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    ingredientItemActive: {
        width: '30%',
        height: 200,
        marginBottom: 50,
        marginRight: '3%',
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderColor: 'rgb(254, 95, 30)',
        borderWidth: 2,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    ingredientImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
        marginBottom: 20
    },
    ingredientName: {
        textAlign: 'center',
        fontSize: 17
    },
    ingredientPrice: {
        textAlign: 'center',
        fontSize: 19
    }
})