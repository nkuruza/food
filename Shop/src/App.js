import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignUp from './screens/SignUp';
import Store from './screens/Store';
import FoodItem from './screens/FoodItem';
import Market from './screens/Market';


const MainNavigator = createStackNavigator({
  Market: { screen: Market },
  SignUp: { screen: SignUp },
  Store: { screen: Store },
  FoodItem: { screen: FoodItem },
});

const App = createAppContainer(MainNavigator);

export default App; 