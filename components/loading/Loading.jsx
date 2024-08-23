import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Image, Text, Animated, Easing } from "react-native";

export default function Loading() {

    const rotationLoading = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.loop(
            Animated.timing(
                rotationLoading, {
                toValue: 1,
                duration: 5000,
                easing: Easing.linear,
                useNativeDriver: true
            }
            )
        ).start()
    }, [rotationLoading])

    const rotationAnimation = rotationLoading.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    return (
        <View style={stylesLoad.container}>
            <Animated.Image
                style={[stylesLoad.image, { transform: [{ rotate: rotationAnimation }] }]}
                source={require('../../img/loading/loading.png')} />
            <Text style={stylesLoad.text}>Загрузка...</Text>
        </View>
    )

}

const stylesLoad = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(254, 95, 30)',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

    },
    image: {
        width: '30%',
        height: '15%',
        resizeMode: 'contain',
        marginBottom: 20
    },
    text: {
        color: 'white',
        fontSize: 26
    }

})