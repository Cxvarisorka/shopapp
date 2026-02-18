import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../screens/Products";
import Product from "../screens/Product";
import { COLORS, FONT_SIZES } from "../theme";

const Stack = createNativeStackNavigator();

const ShopNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.surface,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: FONT_SIZES.lg,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Stack.Screen
        name="products"
        component={Products}
        options={{ title: "Shop" }}
      />
      <Stack.Screen
        name="product"
        component={Product}
        options={{ title: "Product Details" }}
      />
    </Stack.Navigator>
  );
};

export default ShopNavigator;
