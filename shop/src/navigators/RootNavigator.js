import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../context/AuthContext";
import { COLORS, FONT_SIZES } from "../theme";

// Screens
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import ShopNavigator from "./ShopNavigator";

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: FONT_SIZES.xs,
          fontWeight: "600",
        },
      }}
    >
      {!user ? (
        <>
          <Tab.Screen
            name="signup"
            component={Signup}
            options={{ tabBarLabel: "Sign Up" }}
          />
          <Tab.Screen
            name="login"
            component={Login}
            options={{ tabBarLabel: "Log In" }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="shop"
            component={ShopNavigator}
            options={{ tabBarLabel: "Shop" }}
          />
          <Tab.Screen
            name="profile"
            component={Profile}
            options={{ tabBarLabel: "Profile" }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default RootNavigator;
