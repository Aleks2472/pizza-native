import { StyleSheet, Text, View } from 'react-native';
import Loading from './components/loading/Loading';
import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import { NavigationContainer } from '@react-navigation/native';
import Navigate from './components/navigate/Navigate';

export default function App() {

  const [isLoading, setIsLoading] = useState(true)
  const [location, setLocation] = useState(null)
  const [city, setCity] = useState(null)

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
    <NavigationContainer>
      <View style={styles.container}>
        <Navigate></Navigate>
      </View>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
