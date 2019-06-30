/* eslint-disable @typescript-eslint/no-use-before-define */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './components/Routes';
import { store, persistor } from './store';

export default class App extends Component {
	public render(): React.ReactNode {
		return (
			<SafeAreaView style={styles.SafeAreaView} >
				<PersistGate loading={null} persistor={persistor}>
					<Provider store={store}>
						<Root>
							<Routes />
						</Root>
					</Provider>
				</PersistGate>
			</SafeAreaView>
		);
	}
}
const styles = StyleSheet.create({
	SafeAreaView: {
		flex: 1,
	},
});

