import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTab from './BottomTab';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import Detail from '../screens/detail';
import Search from '../screens/search';
import Info from '../screens/info';
import SplashScreen from '../screens/splashScreen';
import DetailListAlbum from '../screens/detail/detailListAlbum';
import DetailLaws from '../screens/detail/detailLaws';
import DetailListVideo from '../screens/detail/detailListVideo';

const Root = createStackNavigator()
const Router = () => {
    return (
        <Root.Navigator screenOptions={{ headerShown: false }}>
            <Root.Screen name='SplashScreen' component={SplashScreen} />
            <Root.Screen name='BottomTab' component={BottomTab} />
            <Root.Screen name='Login' component={Login} />
            <Root.Screen name='Info' component={Info} />
            <Root.Screen name='Search' component={Search} />
            <Root.Screen name='Register' component={Register} />
            <Root.Screen name='Detail' component={Detail} />
            <Root.Screen name='DetailListAlbum' component={DetailListAlbum} />
            <Root.Screen name='DetailListVideo' component={DetailListVideo} />
            <Root.Screen name='DetailLaws' component={DetailLaws} />

        </Root.Navigator>
    )
}

export default Router
