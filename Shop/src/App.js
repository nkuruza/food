import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignUp from './screens/SignUp';


const MainNavigator = createStackNavigator({
  SignUp: { screen: SignUp }
});

const App = createAppContainer(MainNavigator);

export default App; 