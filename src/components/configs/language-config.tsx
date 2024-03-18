import { View, Text, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import React, { useState, useEffect } from 'react'
import Storage from 'expo-storage'

import useStyles from '@/src/hooks/useStyle'
import Dropdown from '@/src/components/ui/dropdown'
import BaseModal from '../ui/base-modal'
import Button from '../ui/button'

enum Language {
    en = 'English',
    es = 'Español',
}

const LanguageConfig = () => {
    const { styles } = useStyles()
    const { t, i18n } = useTranslation()
    const [language, setLanguage] = useState('en')
    const { CustomModal, showModal, hideModal } = BaseModal(true)

    useEffect(() => {
        Storage.getItem({ key: "language" }).then((res: any) => {
            setLanguage(res)
        })
    }, [])

    const handleChangeLanguage = async (key: string) => {
        await Storage.setItem({ key: "language", value: key })
        i18n.changeLanguage(key)
        setLanguage(key)
        hideModal()
    }

    return (
        <>
            <Dropdown title={t("language.language")}>
                <View style={styles.row}>
                    <Text style={styles.text}>{t(`language.${language}`)}</Text>
                    <Button onPress={showModal} >
                        <Text>{t("language.changeLanguage")}</Text>
                    </Button>
                </View>
            </Dropdown>
            <CustomModal>
                <View style={styles.col}>
                    <Text style={styles.title}>Select the lan</Text>
                    {
                        Object.keys(Language).map((key, index) => (
                            <TouchableOpacity key={index} style={styles.button} onPress={() => handleChangeLanguage(key)}>
                                <Text>{Language[key as keyof typeof Language]}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </CustomModal>
        </>
    )
}

export default LanguageConfig