import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle, StyleProp } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import useStyles from '@/src/hooks/useStyle';
import BaseModal from './base-modal';

export interface SwipeItemProps {
    children: React.ReactNode;
    handleDelete: () => void;
    handleUpdate?: () => void;
    deleteContent?: React.ReactNode;
    style?: StyleProp<ViewStyle>
    top?: number
}

const SwipeItem = ({ children, handleDelete, handleUpdate, deleteContent, style, top }: SwipeItemProps) => {
    const { styles, colors } = useStyles();
    const translationX = useSharedValue(0)
    const deleteColor = colors?.colors?.delete || 'red'
    const editColor = colors?.colors?.edit || '#edaf02'
    const { CustomModal, showModal, hideModal } = BaseModal(true)
    const { t } = useTranslation()

    const pan = Gesture.Pan().onUpdate(e => {
        const val = e.translationX
        if (val > -150 && val < 150) {
            translationX.value = val
        }
    }).onEnd(e => {
        if (e.translationX < -90) {
            runOnJS(showModal)()
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

    const onConfirmDelete = () => {
        handleDelete()
        hideModal()
    }

    return (
        <View>
            <GestureDetector gesture={pan}>
                <Animated.View style={[style ? style : styles.horizontalBlock, animatedStyle]}>
                    {children}
                </Animated.View>
            </GestureDetector>
            <Animated.View style={[styles.backgroundButton, styles.fixedBackground, animatedOpacity, { right: 0, top }]}>
                <Feather name="trash" size={24} color={deleteColor} />
            </Animated.View>
            {
                handleUpdate && (
                    <Animated.View style={[styles.backgroundButton, styles.fixedBackground, animatedOpacity, { left: 0, top }]}>
                        <Feather name="edit-2" size={24} color={editColor} />
                    </Animated.View>
                )
            }
            <CustomModal title={t("delete")}>
                {deleteContent || (
                    <View style={styles.col}>
                        <Text style={styles.text}>{t("confirmDelete")}</Text>
                        <View style={[styles.row, { justifyContent: "space-around" }]}>
                            <TouchableOpacity style={styles.button} onPress={hideModal}>
                                <Text style={styles.text}>{t("cancel")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.enfasizedButton} onPress={onConfirmDelete}>
                                <Text style={styles.text}>{t("confirm")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </CustomModal>

        </View>
    )
}


export default SwipeItem