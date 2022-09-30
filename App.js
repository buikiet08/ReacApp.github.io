import { StatusBar, SafeAreaView } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
// import { LinearGradient } from 'react-native-linear-gradient';
import Router from './src/router';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { Avatar } from '@rneui/base';
import { images } from './src/contains';

export default function App() {
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.header}>
        <ImageBackground source={images.background} resizeMode="cover" style={styles.image}>
          <View style={styles.calender}>
            <Entypo name="calendar" size={24} color="black" />
            <Text>{date} tháng {month}, {year}</Text>
          </View>
          <View style={styles.action}>
            <AntDesign name="search1" size={24} color="black" />
            <View>
              <Avatar
                size={40}
                rounded
                icon={{ name: 'pencil', type: 'font-awesome' }}
                containerStyle={{ backgroundColor: '#6733b9' }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      <Router />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 100,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16

  },
  calender: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: "center",
  },
  image:{
    flex:1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  }
});
