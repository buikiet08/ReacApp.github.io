import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Router from './src/router';
import { PageProvider } from './src/hook/usePage';


export default function App() {

  return (
    <NavigationContainer>
      {
        <PageProvider>
          <View style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            <Router />
          </View>
        </PageProvider>
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
