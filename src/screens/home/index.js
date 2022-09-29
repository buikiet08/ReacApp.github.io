import React from 'react'
import { StyleSheet, Text } from 'react-native'

function Home() {
  return (
    <Text style={styles.text}>Home</Text>
  )
}

export default Home

const styles = StyleSheet.create({
  text: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20,
    color: 'red'
  },
});