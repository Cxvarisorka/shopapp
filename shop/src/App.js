import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import RootNavigator from './navigators/RootNavigator';
import { ProductsProvider } from './context/ProductsContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <ProductsProvider>
            <RootNavigator />
          </ProductsProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
