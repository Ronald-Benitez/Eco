import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";

import StackBase from "@/src/components/navigation/stack-base";

export default function Layout() {
    const { t } = useTranslation();

    return (
        <StackBase>
            <Tabs.Screen
                name="giveaway"
                options={{
                    title: t('pages.giveaway'),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="gift-outline" size={size} color={color} />
                    )
                }} />
        </StackBase>
    );
}