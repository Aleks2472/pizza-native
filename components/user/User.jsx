import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import { MyContext } from '../../App'

export default function User() {

    const contextValue = useContext(MyContext)

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')

    useEffect(() => {

        const loadUserData = async () => {

            try {
                const storedData = await AsyncStorage.getItem('@user_data')
                if (storedData !== null) {
                    const parsedData = JSON.parse(storedData)
                    setUserName(parsedData.name)
                    setUserEmail(parsedData.email)
                }
                const storedThem = await AsyncStorage.getItem('@user_them')
                if (storedThem !== null) {
                    if (storedThem === 'flex-end') {
                        contextValue.setThemButton(storedThem)
                        contextValue.setThem('rgba(0,0,0,0.85)')
                        contextValue.setThemText('white')
                        contextValue.setThemBackgroundOpacity('rgba(255,255,255,0.08)')
                    } else {
                        contextValue.setThemButton(storedThem)
                        contextValue.setThem('white')
                        contextValue.setThemText('black')
                        contextValue.setThemBackgroundOpacity('rgba(0,0,0,0.06)')
                    }
                }
            } catch (error) {
                console.error('Ошибка', error)
            }

        }

        loadUserData()

    }, [])

    const themChange = async () => {

        try {
            if (contextValue.themButton === 'flex-start') {
                await AsyncStorage.setItem('@user_them', ('flex-end'))
                contextValue.setThemButton('flex-end')
                contextValue.setThem('rgba(0,0,0,0.85)')
                contextValue.setThemText('white')
                contextValue.setThemBackgroundOpacity('rgba(255,255,255,0.08)')
            } else {
                await AsyncStorage.setItem('@user_them', JSON.stringify('flex-start'))
                contextValue.setThemButton('flex-start')
                contextValue.setThem('white')
                contextValue.setThemText('black')
                contextValue.setThemBackgroundOpacity('rgba(0,0,0,0.06)')
            }
        } catch { }

    }

    return (
        <View style={[styleUser.container, { backgroundColor: contextValue.them }]}>
            <Text style={[styleUser.name, { color: contextValue.themText }]}>{userName}</Text>
            <Text style={styleUser.email}>{userEmail}</Text>
            <Text style={[styleUser.adress, { color: contextValue.themText }]}>{contextValue.address}</Text>
            <View style={styleUser.them}>
                <Text style={[styleUser.themText, { color: contextValue.themText }]}>Тема</Text>
                <TouchableWithoutFeedback onPress={() => themChange()}>
                    <View style={[styleUser.themCheckBox, { justifyContent: contextValue.themButton }]}>
                        <View style={styleUser.themCheckBoxItem}></View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )

}

const styleUser = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 70,
        backgroundColor: 'white',
        paddingHorizontal: '5%'
    },
    name: {
        fontSize: 22,
        marginBottom: 10
    },
    email: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 10
    },
    adress: {
        fontSize: 20,
        marginBottom: 20
    },
    them: {
        width: '100%',
        height: 55,
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,0.20)',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    themText: {
        fontSize: 20,

    },
    themCheckBox: {
        width: 60,
        height: '90%',
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,0.30)',
        borderRadius: 50,
        borderWidth: 1,
        backgroundColor: 'rgb(255,90,35)',
        paddingHorizontal: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    themCheckBoxItem: {
        width: 25,
        height: '90%',
        backgroundColor: 'white',
        borderRadius: 50
    }

})