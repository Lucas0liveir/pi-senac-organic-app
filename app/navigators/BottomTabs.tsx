import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { useStores } from 'app/models';
import * as Screens from "app/screens"
import { colors } from 'app/theme';
import { observer } from 'mobx-react-lite';
import { Text, View } from 'react-native';
const Tab = createBottomTabNavigator();

export const MyTabs = observer(function MyTabs() {

    const { cartStore } = useStores()

    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home-variant-outline'
                            : 'home-variant-outline';
                    } else if (route.name === 'Buscar') {
                        iconName = focused ? 'search' : 'search';
                        return <Icon type='octicon' name={iconName} size={focused ? 18 : size} color={color} />;
                    } else if (route.name === 'Carrinho') {
                        iconName = focused ? 'shopping-bag' : 'shopping-bag';
                        return <View style={{ position: "relative" }}>
                            <Icon type='feather' style={{ marginLeft: focused ? 8 : 0 }} name={iconName} size={focused ? 18 : size} color={color} />
                            {!focused && cartStore.products.length ? <View
                                style={{ width: 18, height: 18, backgroundColor: "#000", borderRadius: 100, position: "absolute", bottom: -6, right: -6 }}
                            >
                                <Text style={{ textAlign: "center", fontSize: 12, color: "#fff" }}>{cartStore.products.length}</Text>
                            </View> : null

                            }
                        </View>;
                    } else if (route.name === 'Perfil') {
                        iconName = focused ? 'person-outline' : 'person-outline';
                        return <Icon type='ionicon' name={iconName} size={focused ? 18 : size} color={color} />;
                    }

                    // You can return any component that you like here!
                    return <Icon type='material-community' name={iconName} size={size} color={color} />

                },
                tabBarLabel({ focused, color, children }) {
                    if (focused && children === "Carrinho") {
                        return <Text style={{ color, textAlign: "center", marginLeft: 18 }}>{children}</Text>
                    }
                    if (focused) {
                        return <Text style={{ color, textAlign: "center", marginLeft: 20 }}>{children}</Text>
                    }
                    return <></>
                },
                tabBarLabelPosition: 'beside-icon',
                tabBarItemStyle: { borderRadius: 100, marginBottom: 10 },
                tabBarStyle: { backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 15, borderTopWidth: 0, width: "100%", height: 110, justifyContent: "center", alignItems: "center" },
                tabBarActiveBackgroundColor: colors.palette.green100,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'black',
            })}
        >
            <Tab.Screen
                options={{
                    headerShown: false
                }}
                name="Home"
                component={Screens.HomeScreen} />
            <Tab.Screen
                options={{
                    headerShown: false
                }}
                name="Buscar"
                component={Screens.SearchScreen} />
            <Tab.Screen
                options={{
                    headerShown: false
                }}
                name="Carrinho"
                component={Screens.CartScreen} />
            <Tab.Screen
                options={{
                    headerShown: false
                }}
                name="Perfil"
                component={Screens.ProfileScreen} />
        </Tab.Navigator>
    );
})