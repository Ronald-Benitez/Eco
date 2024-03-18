import React, { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { MaterialIcons } from '@expo/vector-icons'

import useStyles from '@/src/hooks/useStyle'
import ColorPicker from '@/src/components/ui/color-picker'
import PrimitiveModal from '@/src/components/ui/primitive-modal'
import Button from '@/src/components/ui/button'
import { type Theme } from '@/src/interfaces/configs'
import { writeFile } from '@/src/helpers/FilesHelper'
import ColorConfigs, { ColorChange, ThemeKeys } from '@/src/components/configs/colors-config'
import LanguageConfig from '@/src/components/configs/language-config'

const Configs = () => {
  let color = '#000000'
  const { styles, getStyles, setStyles, colors, reloadColors } = useStyles()
  const { t } = useTranslation()
  const [colorToChange, setColorToChange] = useState<ColorChange>({ key: '', subKey: '', color: '' })
  const { CustomModal, showModal, hideModal } = PrimitiveModal(true)

  if (!colors) return <></>

  const handleLoad = async () => {
    await reloadColors()
    setColorToChange({ key: '', subKey: '', color: '' })
    getStyles().then(setStyles)
  }

  const handleColorChange = async (color: string) => {
    if (colorToChange.color === color) return

    if (colorToChange.key === '' && colorToChange.subKey === '') return

    const key = colorToChange.key as ThemeKeys
    const subKey = colorToChange.subKey as keyof Theme[ThemeKeys]

    const newColors = { ...colors }
    try {
      // @ts-ignore
      newColors[key][subKey] = color
      await writeFile('colors.json', JSON.stringify(newColors))
      hideModal()
      handleLoad()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <ColorConfigs
          colors={colors}
          handleLoad={handleLoad}
          setColorToChange={setColorToChange}
          showModal={showModal}
        />
        <LanguageConfig />
      </ScrollView>
      <CustomModal
        title={`${t('colors.change')} (${t(`colors.${colorToChange.key}`)} - ${t(`colors.${colorToChange.subKey}`)})`}
      >
        <ColorPicker color={colorToChange.color} onColorChange={(e) => { color = e }} baseWith={300} />
        <View style={[styles.row, { justifyContent: "space-around" }]}>
          <Button onPress={hideModal} >
            <MaterialIcons name="cancel-presentation" size={24} color={colors.colors.primaryText} />
            <Text style={styles.text}>Cancel</Text>
          </Button>
          <Button onPress={() => handleColorChange(color)} style={styles.enfasizedButton} >
            <MaterialIcons name="check-circle-outline" size={24} color={colors.colors.accentText} />
            <Text style={styles.enfasizedText}>Change</Text>
          </Button>
        </View>
      </CustomModal>
    </>
  )
}

export default Configs