import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppStore } from '../store/useAppStore';

import { LoginScreen } from '../screens/LoginScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen';
import { RoleSelectionScreen } from '../screens/RoleSelectionScreen';
import { BOADashboardScreen } from '../screens/BOADashboardScreen';
import { FindMyBuildingsScreen } from '../screens/FindMyBuildingsScreen';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const { token, role } = useAppStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        ) : !role ? (
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        ) : role === 'boa' ? (
          <Stack.Screen name="BOADashboard" component={BOADashboardScreen} />
        ) : (
          <Stack.Screen name="FindMyBuildings" component={FindMyBuildingsScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
