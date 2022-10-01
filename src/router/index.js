import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTab from './BottomTab';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';

const Root = createStackNavigator()
const Router = () => {
    return (
        <Root.Navigator screenOptions={{ headerShown: false }}>
            <Root.Screen name='BottomTab' component={BottomTab} />
            <Root.Screen name='Login' component={Login} />
            <Root.Screen name='Register' component={Register} />
        </Root.Navigator>
    )
}

export default Router
