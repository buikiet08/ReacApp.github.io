import { StatusBar, SafeAreaView } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Router from './src/router';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { Avatar } from '@rneui/base';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.header}>
        <View>
          <Entypo name="calendar" size={24} color="black" />
          <Text>T5, 29 tháng 9, 2022</Text>
        </View>
        <View>
          <AntDesign name="search1" size={24} color="black" />
          <View>
            <Avatar
              size={64}
              rounded
              icon={{ name: 'pencil', type: 'font-awesome' }}
              containerStyle={{ backgroundColor: '#6733b9' }}
            />
          </View>
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
    display: 'flex',
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#999'
  }
});
