import { View, Text } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

import useStyles from '@/src/hooks/useStyle'
import Button from '@/src/components/ui/button'

export interface ColorBlockProps {
    color: string
    title: string
    onClick: () => void
}

const ColorBlock: React.FC<ColorBlockProps> = ({ color, title, onClick }) => {
    const { styles } = useStyles()
    const { t } = useTranslation()

    if (!color || !title) return (<></>)

    return (
        <View style={styles.row}>
            <Text style={[styles.textColor, { borderColor: color, minWidth: 200 }]}>{t(`colors.${title}`)}</Text>
            <Button style={[styles.colorView, { backgroundColor: color }]} onPress={onClick} />
        </View>
    )
}

export default ColorBlock