import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import useStyles from '@/src/hooks/useStyle';

export interface BaseModalProps {
    children: React.ReactNode;
    title?: string;
    button?: React.ReactNode;
    hideOnBackdropPress?: boolean;
}

const PrimitiveModal = (hideOnBackdropPress: BaseModalProps["hideOnBackdropPress"]) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { styles } = useStyles();

    const hideModal = () => setModalVisible(false);
    const showModal = () => setModalVisible(true);

    const backdropPress = () => {
        if (hideOnBackdropPress) hideModal();
    }

    const CustomModal = ({ children, title, button }: BaseModalProps) => (
        <>
            {
                button && (
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        {button}
                    </TouchableOpacity>
                )
            }
            {
                modalVisible && (
                    <Pressable onPress={backdropPress} style={styles.primitiveModalContainer}>
                        <Pressable onPress={() => { }} style={[styles?.modalContent, { width: "100%" }]}>
                            <Text style={styles.title}>{title && title}</Text>
                            {children}
                        </Pressable>
                    </Pressable>
                )}
        </>
    );

    return {
        CustomModal,
        hideModal,
        showModal,
    };
};

export default PrimitiveModal;
