import React, { Suspense, useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import data from '@/src/files/configs.json';
import { SQLiteProvider } from 'expo-sqlite/next';

import CustomDrawer from '@/src/components/navigation/custom-drawer';
import "@/src/languages/i18n"
import { StylesProvider } from '@/src/context/StylesContext';
import useStyles from '@/src/hooks/useStyle';
import Loading from '@/src/components/basics/loading';
import { type Theme } from '@/src/interfaces/configs';
import { readFile } from '@/src/helpers/FilesHelper';
import { openDatabase } from '@/src/db/db';

export default function Layout() {
    const { loading } = useStyles();
    const [colors, setColors] = useState<Theme>(data as Theme)
    const { t } = useTranslation();

    useEffect(() => {
        const loadColors = async () => {
            const res = await readFile('colors.json')
            setColors(JSON.parse(res) as Theme)
        }
        loadColors()
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StylesProvider>
                {loading ? (
                    <Loading />
                ) : (
                    <Suspense fallback={<Loading />}>
                        <SQLiteProvider databaseName='db.db' onInit={openDatabase} useSuspense>
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
                                            backgroundColor: colors?.headers.home || '#fff',
                                        },
                                    }}

                                />
                                <Drawer.Screen
                                    name="(days)"
                                    options={{
                                        title: t('pages.days'),
                                        headerShown: false,
                                        drawerIcon: ({ color, size }) => (
                                            <Ionicons name="calendar-clear-outline" size={size} color={color} />
                                        )
                                    }}
                                />
                                <Drawer.Screen
                                    name="(financials)"
                                    options={{
                                        title: t('pages.financials'),
                                        headerShown: false,
                                        drawerIcon: ({ color, size }) => (
                                            <Ionicons name="wallet-outline" size={size} color={color} />
                                        )
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
                                        ),
                                        headerStyle: {
                                            backgroundColor: colors?.headers.settings || '#fff',
                                        },
                                    }}

                                />
                                <Drawer.Screen
                                    name="+not-found"
                                    options={{ drawerLabel: () => null }}
                                />
                            </Drawer>
                        </SQLiteProvider>
                    </Suspense>
                )}
            </StylesProvider>
        </GestureHandlerRootView>
    );
}
