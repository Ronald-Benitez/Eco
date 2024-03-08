import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import useStyles from '@/src/hooks/useStyle'
import Animated, { useAnimatedStyle, useSharedValue, withDecay, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from "expo-clipboard";

import Button from './button'
import TapBlock from './color-picker/tap-block'
import useToast from './useToast';

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
    const [baseColor, setBaseColor] = useState<string>(color)
    let rgba = color.replace('#', '').match(/.{1,2}/g) || []
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
        baseColor !== value && setBaseColor(value)
        calculateRGBA(value)
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
    }

    const calculateRGBA = (value: string) => {
        rgba = value.replace('#', '').match(/.{1,2}/g) || []
    }

    return (
        <>
            <Animated.View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <View style={styles2.container}>
                    <Button onPress={handleCopy} >
                        <MaterialIcons name="content-copy" size={24} color="black" />
                    </Button>
                    <Text style={styles2.textColor}>{color}</Text>
                    <Button onPress={handlePaste} >
                        <MaterialIcons name="content-paste" size={24} color="black" />
                    </Button>
                </View>
                <Animated.View style={[styles2.colorBlock, animatedBlockStyle]} />
                <ScrollView horizontal style={[styles2.colorContainer]}>
                    {DefaultColors.map((color, index) => (
                        <Button onPress={() => handleColorChange(color)} style={[{ backgroundColor: color }, styles2.colorView]} key={index}>
                            <></>
                        </Button>
                    ))}
                </ScrollView>

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

const styles2 = StyleSheet.create({
    colorView: {
        width: 48,
        height: 48,
        borderRadius: 5,
        elevation: 5,
        margin: 4,
    },
    colorContainer: {
        maxWidth: 300,
        maxHeight: 75,
    },
    colorBlock: {
        width: 100,
        height: 100,
        borderRadius: 5,
        margin: 4,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#00000025",
        borderWidth: 1,
    },
    textColor: {
        fontWeight: "bold",
        fontSize: 15,
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        height: 40,
        textAlign: "center",
        textAlignVertical: "center",
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 20
    },
})

export default ColorPicker