import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import BottomTab from './BottomTab';
import Test from '../screens/test';

const Root = createStackNavigator()
const Router = () => {
    return (
        <NavigationContainer>
            <Root.Navigator screenOptions={{ headerShown: false }}>
                <Root.Screen name='BottomTab' component={BottomTab} />
                <Root.Screen name='SignIn' component={Test} />
            </Root.Navigator>
        </NavigationContainer>
    )
}

export default Router
