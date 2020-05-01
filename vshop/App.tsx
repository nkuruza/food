import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Store from './src/screens/Store';
import FoodItem from './src/screens/FoodItem';
import Market from './src/screens/Market';
import Merchant from './src/screens/Merchant';
import ShopForm from './src/screens/ShopForm';
import Cart from './src/screens/Cart';
import Product from './src/screens/Product';
import CustomerOrder from './src/screens/CustomerOrder';
import Orders from './src/screens/Orders';
import Home from './src/screens/Home';
import UserDetails from './src/screens/UserDetails';
import LocationSelector from './src/screens/Map';
import MarketShop from './src/screens/MarketShop';
import EditProduct from './src/screens/EditProduct';
import MerchantOrder from './src/screens/MerchantOrder';
import ScanCode from './src/screens/ScanCode';
import CustomerOrders from './src/screens/CustomerOrders';



const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  UserDetails: { screen: UserDetails },
  Market: { screen: Market },
  Store: { screen: Store },
  FoodItem: { screen: FoodItem },
  Merchant: { screen: Merchant },
  ShopForm: { screen: ShopForm },
  Product: { screen: Product },
  Cart: { screen: Cart },
  CustomerOrder: { screen: CustomerOrder },
  Orders: { screen: Orders },
  CustomerOrders: { screen: CustomerOrders },
  Map: { screen: LocationSelector },
  MarketShop: { screen: MarketShop },
  EditProduct: {screen: EditProduct },
  MerchantOrder: { screen: MerchantOrder  },
  ScanCode: {screen: ScanCode}
});

const App = createAppContainer(MainNavigator);

export default App; 
