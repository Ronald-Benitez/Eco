import { Pressable } from 'react-native'
import React from 'react'
import useStyles from '@/src/hooks/useStyle'
import Animated, { useAnimatedStyle, useSharedValue, runOnJS, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { View } from '@/components/Themed';

export interface ButtonProps {
    children?: React.ReactNode;
    onPress: () => void;
    style?: any;
}

const Button: React.FC<ButtonProps> = ({ children, onPress, style }) => {
    const { styles, loading } = useStyles()
    const zoom = useSharedValue(1)

    if (loading) return null

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: zoom.value }]
    }))

    const tab = Gesture.Tap().onStart(() => {
        zoom.value = withTiming(0.9, { duration: 0 })
    }).onEnd(() => {
        zoom.value = withTiming(1, { duration: 100 })
        runOnJS(onPress)()
    })

    return (
        <GestureDetector gesture={tab}>
            <Animated.View style={[animatedStyle]}>
                <View style={style ? style : styles.button}>
                    {children && children}
                </View>
            </Animated.View>
        </GestureDetector>
    )
}

export default Button