import { StatusBar, SafeAreaView } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Router from './src/router';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { Avatar } from "native-base";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.header}>
        <Entypo name="calendar" size={24} color="black" />
        <View>
          <AntDesign name="search1" size={24} color="black" />
          <Avatar bg="green.500" source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          }}>
            AJ
          </Avatar>
        </View>
      </View>
      <Router />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  header: {
    height: 100,
    justifyContent:"space-between",
    alignItems:"center",
    backgroundColor:'#999'
  }
});
