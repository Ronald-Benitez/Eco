import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { runOnJS, runOnUI, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export interface TapBlockProps {
    baseColor: string;
    onChange: (color: string) => void;
    baseWith: number;
    baseHeigth: number;
    disposition: "horizontal" | "vertical";
    baseHex: string;
    icon: React.ReactNode;
}


const TapBlock: React.FC<TapBlockProps> = ({ baseColor, disposition, baseHeigth, baseWith, onChange, baseHex, icon }) => {
    const horizontal = disposition === "horizontal"
    const selectWith = useSharedValue(horizontal ? baseWith : baseHeigth)

    useEffect(() => {
        selectWith.value = withTiming((horizontal ? baseWith : baseHeigth) - 35)
    }, [baseColor])

    useEffect(() => {
        const normalized = parseInt(baseHex, 16) / 255
        let value = normalized * (horizontal ? baseWith : baseHeigth)
        const max = (horizontal ? baseWith : baseHeigth) - 35
        if (value > max) value = max
        selectWith.value = withTiming(value)
    }, [baseHex])

    const calculateColor = (e: { x: number, y: number }) => {
        const { x, y } = e
        const value = horizontal ? x : y
        if (value < 0 || value > (horizontal ? baseWith : baseHeigth) - 35) return

        selectWith.value = value
        const normalized = value / (horizontal ? baseWith : baseHeigth)
        let hex = Math.floor(normalized * 255).toString(16)
        if (hex.length === 1) hex = `0${hex}`
        onChange(hex)
    }

    const pan = Gesture.Pan().onUpdate((e) => {
        runOnJS(calculateColor)(e)
    })

    const tap = Gesture.Tap().onEnd((e) => {
        runOnJS(calculateColor)(e)
    })


    const animatedSelectorStyle = useAnimatedStyle(() => {
        if (horizontal) {
            return {
                left: selectWith.value
            }
        }
        return {
            top: selectWith.value,
        }
    })

    const start = horizontal ? { x: 0, y: 0 } : { x: 0, y: 1 }
    const end = horizontal ? { x: 1, y: 0 } : { x: 0, y: 1 }

    return (
        <View style={styles.row}>
            <View style={styles.underBlock}>
                {icon}
            </View>
            <GestureDetector gesture={tap}>
                <GestureDetector gesture={pan}>
                    <LinearGradient
                        colors={["#ffffff", baseColor]}
                        style={[styles.brigthnessBlock, { width: baseWith, height: baseHeigth }]}
                        start={start}
                        end={end}
                    >
                        <Animated.View style={[styles.brightnessSelector, animatedSelectorStyle]} />
                    </LinearGradient>
                </GestureDetector >
            </GestureDetector>
        </View>
    )
}

const styles = StyleSheet.create({
    brigthnessBlock: {
        borderRadius: 5,
        elevation: 5,
        margin: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    brightnessSelector: {
        position: "absolute",
        width: 35,
        height: 35,
        borderRadius: 100,
        elevation: 15,
        borderColor: "white",
        borderWidth: 3,
        backgroundColor: "transparent",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    underBlock: {
        width: 48,
        height: 48,
        elevation: 10,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
})

export default TapBlock