import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Feather } from "@expo/vector-icons";

import useStyles from '@/src/hooks/useStyle';

interface DropdownProps {
    children: React.ReactNode
    title?: string
}

const Dropdown: React.FC<DropdownProps> = ({ children, title }) => {
    const { styles } = useStyles()
    const [active, setActive] = React.useState(false)

    return (
        <View style={styles.dropdowmContainer}>
            <Pressable style={[styles.col, { alignItems: "center", gap: 0 }]} onPress={() => setActive(!active)}>
                {title && <Text style={active ? styles.title : styles.text}>{title}</Text>}
                <Feather name={active ? "chevron-up" : "chevron-down"} size={30} color="black" />
            </Pressable>
            {active && <View style={styles.row}>
                {children}
            </View>}
        </View>
    )
}

export default Dropdown