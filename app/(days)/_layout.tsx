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
                    title: t('pages.days'),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-clear-outline" size={size} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: colors?.headers.days || '#fff'
                    }
                }} />
        </StackBase>
    );
}