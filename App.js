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
  const [address, setAddress] = useState(null)
  const [cartPage, setCartPage] = useState([])
  const [login, setLogin] = useState(false)
  const [account, setAccount] = useState([])
  const [themButton, setThemButton] = useState('flex-start')
  const [them, setThem] = useState('white')
  const [themText, setThemText] = useState('black')
  const [themBackgroundOpacity, setThemBackgroundOpacity] = useState('rgba(0,0,0,0.06)')

  const valueContext = {
    cartPage,
    setCartPage,
    login, setLogin,
    account,
    setAccount,
    address,
    them,
    setThem,
    themText,
    setThemText,
    themBackgroundOpacity,
    setThemBackgroundOpacity,
    themButton,
    setThemButton
  }

  useEffect(() => {
    const loadLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setIsLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const { latitude, longitude } = location.coords;
      const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (reverseGeocode.length > 0) {
        const { city, street, country, name } = reverseGeocode[0];
        setAddress(`${country}, ${city}, ${street}, ${name}`);
      }

      setIsLoading(false);
    }

    const timout = setTimeout(() => {
      loadLocation();
    }, 2000);

    return () => clearTimeout(timout);

  }, []);

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
