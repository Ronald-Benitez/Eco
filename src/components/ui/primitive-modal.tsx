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
                    <View style={styles.primitiveModalContainer}>
                        <Pressable onPress={backdropPress} style={styles?.modalBackdrop}>
                            <Pressable onPress={() => { }} style={styles?.modalContent}>
                                <Text style={styles.title}>{title && title}</Text>
                                {children}
                            </Pressable>
                        </Pressable>
                    </View>
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
