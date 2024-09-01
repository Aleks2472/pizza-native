import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Alert } from 'react-native'
import { MyContext } from '../../App'
import Loading from '../loading/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login() {

    const contextValue = useContext(MyContext)

    const [registration, setRegistration] = useState(false)
    const [registrationEmail, setRegistrationEmail] = useState('')
    const [registrationPassword, setRegistrationPassword] = useState('')
    const [registrationRepeatPassword, setRegistrationRepeatPassword] = useState('')
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [nameInput, setNameInput] = useState('')
    const [activeLoading, setActiveLoading] = useState(false)

    useEffect(() => {
        const initializeApp = async () => {
            try {

                const storedThem = await AsyncStorage.getItem('@user_them')
                if (storedThem !== null) {
                    if (storedThem === 'flex-end') {
                        contextValue.setThem('rgba(0,0,0,0.85)')
                        contextValue.setThemText('white')
                        contextValue.setThemBackgroundOpacity('rgba(255,255,255,0.08)')
                    } else {
                        contextValue.setThem('white')
                        contextValue.setThemText('black')
                        contextValue.setThemBackgroundOpacity('rgba(0,0,0,0.06)')
                    }
                }

                const loginStatus = await AsyncStorage.getItem('@login_status')
                if (loginStatus !== null) {
                    contextValue.setLogin(JSON.parse(loginStatus))
                }
            } catch (e) {
                console.error('Ошибка при инициализации приложения', e)
            } finally {
                setActiveLoading(false)
            }
        }

        initializeApp()
    }, [])

    const linkButton = () => {
        setRegistration(!registration)
    }

    const handleChangeEmailLogin = (newText) => {
        setLoginEmail(newText)
    }

    const handleChangeEmailPassword = (newText) => {
        setLoginPassword(newText)
    }

    const handleChangeRegistrationEmail = (newText) => {
        setRegistrationEmail(newText)
    }

    const handleChangeRegistrationPassword = (newText) => {
        setRegistrationPassword(newText)
    }

    const handleChangeRegistrationPasswordRepeat = (newText) => {
        setRegistrationRepeatPassword(newText)
    }

    const handleChangeNameInput = (newText) => {
        setNameInput(newText)
    }
    const registrationButton = async () => {
        const data = {
            email: registrationEmail,
            password: registrationPassword,
            name: nameInput
        };

        if (
            registrationEmail.length > 0 &&
            registrationPassword.length >= 6 &&
            registrationPassword === registrationRepeatPassword &&
            nameInput.length > 0
        ) {
            try {
                await AsyncStorage.setItem('@user_data', JSON.stringify(data));
                contextValue.setAccount(prevAccount => [...prevAccount, data]);
                setRegistration(false);
            } catch (error) {
                console.error('Ошибка при сохранении данных в AsyncStorage', error);
                Alert.alert('Ошибка', 'Не удалось сохранить данные');
            }
        } else {
            if (registrationEmail.length === 0) {
                Alert.alert('Не верная почта', 'Введите email');
            } else if (registrationPassword.length < 6) {
                Alert.alert('Не правильно введён пароль', 'Пароль должен быть не менее 6 символов');
            } else if (registrationPassword !== registrationRepeatPassword) {
                Alert.alert('Пароль не совпадает', 'Попробуйте ещё раз');
            } else if (nameInput.length === 0) {
                Alert.alert('Поле имени не заполнено', 'Введите имя');
            }
        }
    };

    const loginButton = () => {

        const account = contextValue.account.find(
            acc => acc.email === loginEmail && acc.password === loginPassword
        )

        if (account) {
            setActiveLoading(true)

            setTimeout(async () => {
                contextValue.setLogin(true)
                await AsyncStorage.setItem('@login_status', JSON.stringify(true))
                setActiveLoading(false)
            }, 2000)

        } else {
            Alert.alert('Не верные данные', 'Повторите попытку')
        }

    }

    if (activeLoading) {
        return <Loading></Loading>
    }

    return (

        <View style={styleLogin.container}>
            <View style={styleLogin.block}>
                <Text style={styleLogin.title}>{
                    registration ? 'Регистрация' : 'Войти'
                }</Text>
                {registration ? (
                    <TextInput
                        style={styleLogin.input}
                        placeholder='Имя'
                        value={nameInput}
                        onChangeText={handleChangeNameInput}></TextInput>
                ) : (
                    null
                )}
                <TextInput
                    style={styleLogin.input}
                    placeholder='Еmail'
                    value={registration ? registrationEmail : loginEmail}
                    onChangeText={registration ? handleChangeRegistrationEmail : handleChangeEmailLogin}></TextInput>
                <TextInput
                    style={styleLogin.input}
                    placeholder={registration ? 'Пароль (не меньше 6 символов)' : 'Пароль'}
                    value={registration ? registrationPassword : loginPassword}
                    onChangeText={registration ? handleChangeRegistrationPassword : handleChangeEmailPassword}></TextInput>
                {registration ? (
                    <TextInput
                        style={styleLogin.input}
                        placeholder='Повторите пароль'
                        value={registrationRepeatPassword}
                        onChangeText={handleChangeRegistrationPasswordRepeat}></TextInput>
                ) : (
                    null
                )}
                <TouchableWithoutFeedback onPress={registration ? () => registrationButton() : () => loginButton()}>
                    <View style={styleLogin.button}>
                        <Text style={styleLogin.textButton}>{
                            registration ? 'Регистрация' : 'Войти'
                        }</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => linkButton()}>
                    <Text style={styleLogin.link}>
                        {
                            registration ? 'Войти' : 'Регистрация'
                        }
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        </View >

    )

}

const styleLogin = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(254, 95, 30)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    block: {
        width: '80%',
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
        color: 'white',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        marginBottom: 30,
        borderRadius: 50,
        paddingHorizontal: 20,
        fontSize: 20
    },
    button: {
        width: '60%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
    textButton: {
        fontSize: 20,
        color: 'rgb(254, 95, 30)'
    },
    link: {
        fontSize: 20,
        color: 'white'
    }
})