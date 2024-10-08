import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableWithoutFeedback, Platform, Modal } from 'react-native'
import { dataPizza, imageMap } from '../../data/DataPizza'
import { useNavigation } from '@react-navigation/native'
import { MyContext } from '../../App'

export default function Home() {

    const contextValue = useContext(MyContext)

    const navigation = useNavigation()
    const [searchValue, setSearchValue] = useState('')
    const [resultSearch, setResultSearch] = useState(dataPizza)
    const [modalOpen, setModalOpen] = useState(false)
    const [sort, setSort] = useState(0)

    const sortItem = [
        { name: 'Популярные' },
        { name: 'Дешевле' },
        { name: 'Дороже' }
    ]

    const openCart = (item) => {
        navigation.navigate('PizzaPage', { item })
    }

    const searchPizza = (name) => {
        const search = dataPizza.filter((pizza) => pizza.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
        setResultSearch(search)
    }

    const sortButton = (index) => {
        setSort(index)
        setModalOpen(false)
    }

    const openSort = () => {
        setModalOpen(true)
    }

    useEffect(() => {

        let sortPizza = [...dataPizza]

        if (sort === 1) {
            sortPizza.sort((a, b) => a.price - b.price)
        } else if (sort === 2) {
            sortPizza.sort((a, b) => b.price - a.price)
        } else {
            sortPizza.sort((a, b) => b.rating - a.rating)
        }

        setResultSearch(sortPizza)

    }, [sort])

    return (

        <View style={[styleHome.container, { backgroundColor: contextValue.them }]}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalOpen}>
                <View style={styleHome.sortBackground}>
                    <View style={[styleHome.sortBlock, { backgroundColor: contextValue.them }]}>
                        {sortItem.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback onPress={() => sortButton(index)} key={index}>
                                    <View
                                        style={sort === index ? styleHome.sortButtonActive : styleHome.sortButton}>
                                        <Text style={sort === index ? styleHome.sortTextActive : [styleHome.sortText, { color: contextValue.themText }]}>{item.name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })}
                    </View>
                </View>
            </Modal>
            <View style={styleHome.header}>
                <TextInput
                    style={[styleHome.search, { backgroundColor: contextValue.them, color: contextValue.themText }]}
                    placeholder='Поиск...'
                    value={searchValue}
                    placeholderTextColor={contextValue.themText}
                    onChangeText={(text) => {
                        setSearchValue(text)
                        searchPizza(text)
                    }}></TextInput>
                <View style={styleHome.filter}>
                    <TouchableWithoutFeedback onPress={() => openSort()}>
                        <View style={[styleHome.button, { backgroundColor: contextValue.them }]}>
                            <Image
                                style={styleHome.buttonImage}
                                source={require('../../img/filter/sort.png')} />
                            <Text
                                style={[styleHome.buttonText, { color: contextValue.themText }]}>{sortItem[sort].name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[styleHome.button, { backgroundColor: contextValue.them }]}>
                        <Image
                            style={styleHome.buttonImage}
                            source={require('../../img/filter/filter.png')} />
                        <Text
                            style={[styleHome.buttonText, { color: contextValue.themText }]}>Фильтр</Text>
                    </View>
                </View>
            </View>
            <FlatList
                style={styleHome.content}
                data={resultSearch}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => openCart(item)}>
                        <View style={styleHome.card}>
                            <Image
                                source={imageMap[item.imageUrl]}
                                style={styleHome.cardImage}></Image>
                            <View style={styleHome.cardText}>
                                <Text style={[styleHome.cardName, { color: contextValue.themText }]}>{item.name}</Text>
                                <Text style={styleHome.cardDescription}>{item.description}</Text>
                                <Text style={[styleHome.cardPrice, { backgroundColor: contextValue.themBackgroundOpacity, color: contextValue.themText }]}>От {item.price}тг</Text>
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
        paddingBottom: Platform.OS === 'ios' ? 90 : 60
    },
    header: {
        width: '100%',
        backgroundColor: 'rgb(254, 95, 30)',
        paddingTop: Platform.OS === 'ios' ? 70 : 50,
        paddingBottom: 20,
    },
    search: {
        width: '90%',
        height: 40,
        fontSize: 15,
        paddingHorizontal: 10,
        margin: 'auto',
        borderRadius: 15
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
        borderRadius: 15,
        paddingHorizontal: 18,
        paddingVertical: 5,
        alignSelf: 'flex-start',
        overflow: 'hidden'
    },
    sortBackground: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.26)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sortBlock: {
        width: '90%',
        height: 200,
        borderRadius: 25,
        overflow: 'hidden'
    },
    sortButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,

    },
    sortButtonActive: {
        backgroundColor: 'rgb(254, 95, 30)',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
    },
    sortText: {
        fontSize: 17,
    },
    sortTextActive: {
        color: 'white',
        fontSize: 17
    }
})