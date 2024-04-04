import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";

import StackBase from "@/src/components/navigation/stack-base";
import useStyles from "@/src/hooks/useStyle";

export default function Layout() {
    const { t } = useTranslation();
    const { colors } = useStyles()

    return (
        <StackBase>
            <Tabs.Screen
                name="index"
                options={{
                    title: t('pages.financials'),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="wallet-outline" size={size} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: colors?.headers.financials || '#fff'
                    }
                }} />
            <Tabs.Screen
                name="expense-adder"
                options={{
                    title: t('pages.expense-adder'),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="trending-down" size={size} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: colors?.headers.financials || '#fff'
                    }
                }} />
        </StackBase>
    );
}