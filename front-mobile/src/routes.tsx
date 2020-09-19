import React from 'react';
// Agrupar todas as rotas da aplicação e gerenciar as mesmas
import { NavigationContainer } from '@react-navigation/native';
// Cria uma pilha de navegação
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import CreateRecord from './pages/CreateRecord';


const Stack = createStackNavigator();

/**
 * headerMode=none: faz com que não aparece o texto da propiedade "name" na tela.
 */

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                headerMode="none" 
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#0B1F34'
                    }
                }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CreateRecord" component={CreateRecord} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;