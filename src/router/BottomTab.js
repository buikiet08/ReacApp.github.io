import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import Home from '../screens/home';
import Domestic from '../screens/domestic';
import World from '../screens/world';
import Category from '../screens/category';
import { COLORS } from '../contains';
const Tab = createBottomTabNavigator()

function BottomTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.secondary,
                headerShown: false
            }}>
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) =>
                        <Entypo name="home" size={24} color={focused ? COLORS.primary : COLORS.secondary} />
                }}
            />
            <Tab.Screen
                name='Trong nước'
                component={Domestic}
                options={{
                    tabBarIcon: ({ focused }) =>
                        <AntDesign name="user" size={24} color={focused ? COLORS.primary : COLORS.secondary} />
                }}
            />
            <Tab.Screen
                name='Thế giới'
                component={World}
                options={{
                    tabBarIcon: ({ focused }) =>
                        <Ionicons name="notifications-outline" size={24} color={focused ? COLORS.primary : COLORS.secondary} />
                }}
            />
            <Tab.Screen
                name='Danh mục'
                component={Category}
                options={{
                    tabBarIcon: ({ focused }) =>
                        <AntDesign name="appstore-o" size={24} color={focused ? COLORS.primary : COLORS.secondary} />
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTab