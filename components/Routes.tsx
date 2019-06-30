import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home/Home';

const stackNavigator = createStackNavigator({
	Home,
},
{
	initialRouteName: 'Home',
	headerMode: 'none',
});

const Routes = createAppContainer(stackNavigator);

export default Routes;
