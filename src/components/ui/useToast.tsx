import { View, Text, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Octicons } from '@expo/vector-icons'

import useStyles from '@/src/hooks/useStyle'

const ToastType = {
    SUCCESS: <Octicons name="check-circle" size={24} color="green" />,
    ERROR: <Octicons name="x-circle" size={24} color="red" />,
    WARNING: <Octicons name="alert" size={24} color="orange" />,
    INFO: <Octicons name="info" size={24} color="blue" />,
}


export interface ToastProps {
    message: string,
    type: keyof typeof ToastType,
}

const useToast = () => {
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState<ToastProps["type"]>("SUCCESS")
    const { styles } = useStyles()

    const showToast = ({ message, type }: ToastProps) => {
        setMessage(message)
        setType(type)
        setShow(true)
        setTimeout(() => {
            setShow(false)
        }, 3000)
    }



    const ToastContainer = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={show}
                onRequestClose={() => setShow(false)}
            >
                <Pressable style={styles.toastContainer} onPress={() => setShow(false)}>
                    <View style={styles.toastContent}>
                        {ToastType[type]}
                        <Text style={styles.text}>{message}</Text>
                    </View>
                </Pressable>
            </Modal>
        )
    }

    return {
        showToast,
        ToastContainer,
    }
}

export default useToast
