import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SingleArticleScreen from '../screens/SingleArticleScreen';

const Stack = createStackNavigator();

function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        headerShown:null
                    }}
                />
                <Stack.Screen
                    name="SingleArticleScreen"
                    component={SingleArticleScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;