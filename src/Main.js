import React from 'react';
import { SafeAreaView } from 'react-native';
import Navigator from './Navigator/Navigator';

import { Provider } from 'react-redux';
import store from './Redux/Store';

const Main = () => {
    return (
        <SafeAreaView style={{flex:1}}>
            <Provider store={store}>
                <Navigator />
            </Provider>
        </SafeAreaView>
    )
}

export default Main
