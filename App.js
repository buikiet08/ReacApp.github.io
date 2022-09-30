import { StatusBar, SafeAreaView } from 'expo-status-bar';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Router from './src/router';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { Avatar } from '@rneui/base';
import { COLORS, images } from './src/contains';

export default function App() {
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.header}>
        <ImageBackground source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/008/141/217/small/panoramic-abstract-web-background-blue-gradient-vector.jpg' }}
          style={styles.background}>
          <View style={styles.calender}>
            <Image source={images.calender} style={styles.calenderIcon} />
            <Text style={styles.calenderText}>{date} tháng {month}, {year}</Text>
          </View>
          <View style={styles.action}>
            <TouchableOpacity activeOpacity={0.6} style={styles.search}>
              <AntDesign name="search1" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <View>
              <Avatar
                size={40}
                rounded
                icon={{ name: 'user', type: 'font-awesome' }}
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
    height: 80,
  },
  calender: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
  calenderIcon: {
    width: 24,
    height: 24,
  },
  calenderText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 4
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: "center",
  },
  background: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    width: null,
    height: null,
    paddingHorizontal: 16,
    paddingTop:20
  },
  search:{
    marginRight:16
  }
});
