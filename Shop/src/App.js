import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignUp from './screens/SignUp';
import Store from './screens/Store';
import FoodItem from './screens/FoodItem';
import Market from './screens/Market';
import Merchant from './screens/Merchant';
import ShopForm from './screens/ShopForm';
import Login from './screens/Login';
import Cart from './screens/Cart';
import Product from './screens/Product';


const MainNavigator = createStackNavigator({
  Market: { screen: Market },
  SignUp: { screen: SignUp },
  Store: { screen: Store },
  FoodItem: { screen: FoodItem },
  Merchant: { screen: Merchant },
  ShopForm: { screen: ShopForm },
  Login: { screen: Login },
  Product: { screen: Product },
  Cart: { screen: Cart }
});

const App = createAppContainer(MainNavigator);

export default App; 