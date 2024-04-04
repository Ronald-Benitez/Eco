import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withDecay, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from "expo-clipboard";

import useStyles from '@/src/hooks/useStyle'
import Button from './button'
import TapBlock from './color-picker/tap-block'
import useToast from '../../hooks/useToast';

const DefaultColors = [
    "#000000",
    "#ffffff",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ff8000",
]

export interface ColorPickerProps {
    color: string;
    onColorChange: (color: string) => void;
    baseWith: number;
}


const ColorPicker: React.FC<ColorPickerProps> = ({ color, onColorChange, baseWith }) => {
    const { styles } = useStyles()
    const colorValue = useSharedValue(color)
    const [colorText, setColorText] = useState<string>(color)
    const [baseColor, setBaseColor] = useState<string>(color)
    // let rgba = color.replace('#', '').match(/.{1,2}/g) || []
    const [rgba, setRgba] = useState<string[]>(color.replace('#', '').match(/.{1,2}/g) || [])
    const { showToast, ToastContainer } = useToast()

    useEffect(() => {
        colorValue.value = color
    }, [color])

    const verifyValidHex = (value: string) => {
        const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
        return regex.test(color);
    };

    const handleCopy = () => {
        Clipboard.setStringAsync(color)
        showToast({ message: "Color copied to clipboard", type: "SUCCESS" })
    }

    const handlePaste = async () => {
        const value = await Clipboard.getStringAsync()
        if (verifyValidHex(value)) {
            handleColorChange(value)
        } else {
            showToast({ message: "Invalid color", type: "ERROR" })
        }
    }

    const handleColorChange = (value: string) => {
        colorValue.value = withDelay(50, withTiming(value))
        onColorChange(value)
        setBaseColor(value)
        calculateRGBA(value)
        setColorText(value)
    }

    const animatedBlockStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: colorValue.value,
        }

    })

    const changeValue = (value: string, index: number) => {
        switch (index) {
            case 0:
                rgba[0] = value
                break
            case 1:
                rgba[1] = value
                break
            case 2:
                rgba[2] = value
                break
            case 3:
                rgba[3] = value
                break
        }
        const newColor = `#${rgba.join('')}`
        colorValue.value = newColor
        onColorChange(newColor)
        setColorText(newColor)
    }

    const calculateRGBA = (value: string) => {
        setRgba(value.replace('#', '').match(/.{1,2}/g) || [])
    }

    return (
        <>
            <Animated.View style={[{ justifyContent: "center", alignItems: "center" }]}>
                <View style={styles.row}>
                    <Button onPress={handleCopy} >
                        <MaterialIcons name="content-copy" size={24} color="black" />
                    </Button>
                    <Text style={styles.textColor}>{colorText}</Text>
                    <Button onPress={handlePaste} >
                        <MaterialIcons name="content-paste" size={24} color="black" />
                    </Button>
                </View>
                <Animated.View style={[styles.colorBlock, animatedBlockStyle]} />
                <View style={[{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }]}>
                    {DefaultColors.map((color, index) => (
                        <Button onPress={() => handleColorChange(color)} style={[{ backgroundColor: color }, styles.colorView]} key={index}>
                            <></>
                        </Button>
                    ))}
                </View>

                <TapBlock
                    baseColor={baseColor}
                    baseHeigth={48} baseWith={baseWith - 50}
                    disposition='horizontal'
                    onChange={(e) => changeValue(e, 3)}
                    baseHex={rgba[3]}
                    icon={<MaterialIcons name="opacity" size={24} color="black" />}
                />

                {/* r g b */}
                <TapBlock
                    baseColor={"#ff0000"}
                    baseHeigth={48}
                    baseWith={baseWith - 50}
                    disposition='horizontal'
                    onChange={(e) => changeValue(e, 0)}
                    baseHex={rgba[0] || "00"}
                    icon={<Text style={{ color: "red" }}>R</Text>}
                />

                <TapBlock
                    baseColor={"#00ff00"}
                    baseHeigth={48}
                    baseWith={baseWith - 50}
                    disposition='horizontal'
                    onChange={(e) => changeValue(e, 1)}
                    baseHex={rgba[1]}
                    icon={<Text style={{ color: "green" }}>G</Text>}
                />
                <TapBlock
                    baseColor={"#0000ff"}
                    baseHeigth={48}
                    baseWith={baseWith - 50}
                    disposition='horizontal'
                    onChange={(e) => changeValue(e, 2)}
                    baseHex={rgba[2]}
                    icon={<Text style={{ color: "blue" }}>B</Text>}
                />
            </Animated.View >
            <ToastContainer />
        </>
    )
}

export default ColorPicker