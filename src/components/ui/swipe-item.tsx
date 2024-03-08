import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

import useStyles from '@/src/hooks/useStyle';

export interface SwipeItemProps {
    children: React.ReactNode;
    handleDelete: () => void;
    handleUpdate?: () => void;
}

const SwipeItem = ({ children, handleDelete, handleUpdate }: SwipeItemProps) => {
    const { styles } = useStyles();
    const translationX = useSharedValue(0)

    const pan = Gesture.Pan().onUpdate(e => {
        translationX.value = e.translationX
    }).onEnd(e => {
        if (e.translationX < -90) {
            runOnJS(handleDelete)()
        }
        if (e.translationX > 90 && handleUpdate) {
            runOnJS(handleUpdate)()
        }
        translationX.value = withSpring(0)
    })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translationX.value }]
    }))

    const animatedOpacity = useAnimatedStyle(() => ({
        opacity: translationX.value < -60 ? 1 : 0 || translationX.value > 60 ? 1 : 0
    }))

    return (
        <View>
            <GestureDetector gesture={pan}>
                <Animated.View style={[styles.horizontalBlock, animatedStyle]}>
                    {children}
                </Animated.View>
            </GestureDetector>
            <Animated.View style={[styles.button, styles.fixedBackground, animatedOpacity, { right: 0 }]}>
                <Feather name="trash" size={24} color="red" />
            </Animated.View>
            {
                handleUpdate && (
                    <Animated.View style={[styles.button, styles.fixedBackground, animatedOpacity, { left: 0 }]}>
                        <Feather name="edit-2" size={24} color="#edaf02" />
                    </Animated.View>
                )
            }

        </View>
    )
}


export default SwipeItem