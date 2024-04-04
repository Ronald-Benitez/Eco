import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'

import { Group } from '@/src/interfaces/finances'
import AddGroup from '@/src/components/finances-group/add-group'
import GroupSelector from '@/src/components/finances-group/group-selector'
import useStyles from '@/src/hooks/useStyle'

const Index = () => {
    const { t } = useTranslation()
    const { styles, colors } = useStyles()
    const baseColor = colors.colors.primaryText
    const [group, setGroup] = useState<Group | null>(null)

    return (
        <View style={styles.container}>
            <GroupSelector table='registerGroup' group={group} setGroup={setGroup} />
            <View style={styles.fixedBottom}>
                <AddGroup table='registerGroup'>
                    <View style={styles.button}>
                        <Ionicons name="folder-open-outline" size={24} color={baseColor} />
                    </View>
                </AddGroup>
            </View>
        </View >
    )
}

export default Index