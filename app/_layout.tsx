import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import CustomDrawer from '@/src/components/navigation/custom-drawer';
import "@/src/languages/i18n"
import { StylesProvider } from '@/src/context/StylesContext';
import useStyles from '@/src/hooks/useStyle';
import Loading from '@/src/components/basics/loading';

export default function Layout() {
    const { loading } = useStyles();
    const { t } = useTranslation();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StylesProvider>
                {loading ? (
                    <Loading />
                ) : (
                    <Drawer
                        drawerContent={(props) => <CustomDrawer {...props} />}
                    >
                        <Drawer.Screen
                            name="index"
                            options={{
                                title: t('pages.home'),
                                drawerIcon: ({ color, size }) => (
                                    <Ionicons name="home-outline" size={size} color={color} />
                                ),
                                headerStyle: {
                                    backgroundColor: 'white',
                                },
                            }}

                        />
                        <Drawer.Screen
                            name="(tools)"
                            options={{
                                title: t('pages.tools'),
                                headerShown: false,
                                drawerIcon: ({ color, size }) => (
                                    <Ionicons name="hammer-outline" size={size} color={color} />
                                )
                            }}
                        />
                        <Drawer.Screen
                            name='configs'
                            options={{
                                title: t('pages.settings'),
                                drawerIcon: ({ color, size }) => (
                                    <Ionicons name="settings-outline" size={size} color={color} />
                                )
                            }}
                        />
                        <Drawer.Screen
                            name="+not-found"
                            options={{ drawerLabel: () => null }}
                        />
                    </Drawer>
                )}
            </StylesProvider>
        </GestureHandlerRootView>
    );
}
