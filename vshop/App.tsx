import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignUp from './src/screens/SignUp';
import Store from './src/screens/Store';
import FoodItem from './src/screens/FoodItem';
import Market from './src/screens/Market';
import Merchant from './src/screens/Merchant';
import ShopForm from './src/screens/ShopForm';
import Login from './src/screens/Login';
import Cart from './src/screens/Cart';
import Product from './src/screens/Product';
import CustomerOrder from './src/screens/CustomerOrder';
import Orders from './src/screens/Orders';


const MainNavigator = createStackNavigator({
  Market: { screen: Market },
  SignUp: { screen: SignUp },
  Store: { screen: Store },
  FoodItem: { screen: FoodItem },
  Merchant: { screen: Merchant },
  ShopForm: { screen: ShopForm },
  Login: { screen: Login },
  Product: { screen: Product },
  Cart: { screen: Cart },
  CustomerOrder: {screen: CustomerOrder},
  Orders: {screen: Orders}
});

const App = createAppContainer(MainNavigator);

export default App; 
