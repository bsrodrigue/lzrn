import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSession } from "../providers";
import {
  ChangeEmailScreen, ChangePasswordScreen,
  ForgotPasswordScreen, LoginScreen, MainScreen, OnboardingScreen,
  RegisterScreen, RegisterSuccessScreen, SettingsScreen, SetupAccountScreen,
  SetupAccountSuccessScreen,
} from "../screens";
import { WelcomeScreen } from "../screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

type PublicStackProps = {
  skipOnboarding: boolean;
};

function PublicStack({ skipOnboarding }: PublicStackProps) {
  const initialRouteName = skipOnboarding ? "Login" : "Onboarding";

  return (
    <Stack.Navigator initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Onboarding' component={OnboardingScreen} />
      <Stack.Screen name='Welcome' component={WelcomeScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
      <Stack.Screen name='RegisterSuccess' component={RegisterSuccessScreen} />
    </Stack.Navigator>
  )
}

function PrivateStack() {
  return (
    <Stack.Navigator initialRouteName={
      "Main"
    } screenOptions={{ headerShown: false }}>
      <Stack.Screen name='SetupAccount' component={SetupAccountScreen} />
      <Stack.Screen name='Main' component={MainScreen} />
      <Stack.Screen name='SetupAccountSuccess' component={SetupAccountSuccessScreen} />
      <Stack.Screen name='Settings' component={SettingsScreen} options={{ headerShown: true, headerTitle: "Paramètres" }} />
      <Stack.Screen name='ChangeEmail' component={ChangeEmailScreen} options={{ headerShown: true, headerTitle: "Paramètres" }} />
      <Stack.Screen name='ChangePassword' component={ChangePasswordScreen} options={{ headerShown: true, headerTitle: "Paramètres" }} />
    </Stack.Navigator>
  )
}

type RootStackNavigatorProps = {
  skipOnboarding: boolean;
}

export default function RootStackNavigator({ skipOnboarding }: RootStackNavigatorProps) {
  const { session } = useSession();

  return (
    <NavigationContainer>
      {session?.token ? (<PrivateStack />) : (<PublicStack skipOnboarding={skipOnboarding} />)}
    </NavigationContainer>
  )
}
