import { StyleSheet, Text, View } from 'react-native';
import Loading from './components/loading/Loading';
import React, { useState, useEffect, createContext } from 'react'
import * as Location from 'expo-location'
import { NavigationContainer } from '@react-navigation/native';
import Navigate from './components/navigate/Navigate';

export const MyContext = createContext()

export default function App() {

  const [isLoading, setIsLoading] = useState(true)
  const [location, setLocation] = useState(null)
  const [city, setCity] = useState(null)
  const [cartPage, setCartPage] = useState([])

  const valueContext = { cartPage, setCartPage }

  useEffect(() => {
    const loadLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setIsLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({})
      setLocation(location)

      const { latitude, longitude } = location.coords;
      const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (reverseGeocode.length > 0) {
        setCity(reverseGeocode[0].city);
      }

      setIsLoading(false);
    }

    const timout = setTimeout(() => {
      loadLocation()
    }, 2000)

    return () => clearTimeout(timout)

  }, [])

  let text = 'Waiting..'
  if (location) {
    text = JSON.stringify(location)
  }

  if (isLoading) {
    return <Loading></Loading>
  }

  return (

    <MyContext.Provider value={valueContext}>
      <NavigationContainer>
        <View style={styles.container}>
          <Navigate></Navigate>
        </View>
      </NavigationContainer>
    </MyContext.Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
