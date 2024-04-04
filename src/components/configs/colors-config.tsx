import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MaterialIcons } from '@expo/vector-icons'

import ColorPicker from '@/src/components/ui/color-picker'
import data from '@/src/files/configs.json'
import useStyles from '@/src/hooks/useStyle'
import { writeFile } from '@/src/helpers/FilesHelper'
import Dropdown from '@/src/components/ui/dropdown'
import Button from '@/src/components/ui/button'
import ColorBlock from '@/src/components/configs/color-block'
import Confirm from '@/src/components/ui/confirm'

import { type Theme } from '@/src/interfaces/configs'

export type ThemeKeys = keyof Theme

export type ColorChange = {
    key: string
    subKey: string
    color: string
}

const keys = Object.keys(data) as Array<keyof Theme>

interface ColorConfigsProps {
    handleLoad: () => void
    colors: Theme
    showModal: () => void
    setColorToChange: React.Dispatch<React.SetStateAction<ColorChange>>
}

const ColorConfigs: React.FC<ColorConfigsProps> = ({ handleLoad, colors, showModal, setColorToChange }) => {
    const { styles } = useStyles()
    const { t } = useTranslation()

    if (!colors) return <></>

    const handleReset = async (key: keyof Theme) => {
        const newColors = { ...colors } as Theme
        // @ts-ignore
        newColors[key] = data[key]
        try {
            await writeFile('colors.json', JSON.stringify(newColors))
            handleLoad()
        } catch (error) {
            console.log(error)
        }
    }

    const hardReset = async () => {
        try {
            await writeFile('colors.json', JSON.stringify(data))
            handleLoad()
        } catch (error) {
            console.log(error)
        }
    }

    const Block = ({ val }: { val: keyof Theme }) => {
        const render: JSX.Element[] = []
        try {
            Object.keys(colors[val]).map((subKey, subIndex) => {
                const dynamicKey = subKey as keyof Theme[ThemeKeys];
                const color = colors[val][dynamicKey]
                render.push(
                    <ColorBlock
                        color={color}
                        title={subKey}
                        onClick={() => {
                            setColorToChange({ key: val, subKey, color })
                            showModal()
                        }}
                        key={subIndex}
                    />
                )

            })
        } catch (error) {
            console.log(error)
        }
        return <>{render}</>
    }

    return (
        <>
            <View style={[styles.col, { marginBottom: 40 }]}>
                <Confirm title={`${t("colors.reset")}`} message={t("colors.resetMessage")} onConfirm={hardReset} >
                    <Button style={styles.enfasizedButton} onPress={() => { }} >
                        <MaterialIcons name="restore" size={24} color={colors.colors.accentText} />
                        <Text style={styles.enfasizedText}>Reset</Text>
                    </Button>
                </Confirm>
                {keys.map((key: keyof Theme, index) => {
                    console.log(key, colors[key])
                    return (
                        <Dropdown key={index} title={t(`colors.${key}`)}>
                            <View style={styles.col}>
                                {
                                    <Block key={key} val={key} />
                                }
                                <Confirm title={`${t("colors.reset")} ${t("colors." + key)}`} message={t("colors.resetMessage")} onConfirm={() => handleReset(key)} >
                                    <Button style={styles.enfasizedButton} onPress={() => { }} >
                                        <MaterialIcons name="restore" size={24} color={colors.colors.accentText} />
                                        <Text style={styles.enfasizedText}>Reset</Text>
                                    </Button>
                                </Confirm>
                            </View>
                        </Dropdown>
                    )
                })}
            </View>
        </>
    )
}

export default ColorConfigs