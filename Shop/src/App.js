import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignUp from './screens/SignUp';
import Store from './screens/Store';


const MainNavigator = createStackNavigator({
  SignUp: { screen: SignUp },
  Store: {screen: Store }
});

const App = createAppContainer(MainNavigator);

export default App; 