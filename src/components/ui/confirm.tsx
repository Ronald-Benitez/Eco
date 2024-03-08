import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

import BaseModal from './base-modal'
import useStyles from '@/src/hooks/useStyle'

export interface ComfirmProps {
    children: React.ReactNode;
    title: string;
    message: string;
    onConfirm: () => void;
}

const Confirm = ({ children, title, message, onConfirm }: ComfirmProps) => {
    const { styles, loading } = useStyles()
    const { CustomModal, hideModal } = BaseModal(true)
    const { t } = useTranslation()

    const handleConfirm = () => {
        onConfirm()
        hideModal()
    }

    if (loading) return null

    return (
        <CustomModal title={title} button={children}>
            <View style={styles.col}>
                <Text style={styles.text}>{message}</Text>
                <View style={[styles.row, { justifyContent: "space-around" }]}>
                    <TouchableOpacity style={styles.button} onPress={hideModal}>
                        <Text style={styles.text}>{t("cancel")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.enfasizedButton} onPress={handleConfirm}>
                        <Text style={styles.text}>{t("confirm")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </CustomModal>
    )
}

export default Confirm