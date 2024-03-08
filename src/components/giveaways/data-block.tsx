import React, { useState } from 'react';
import { View, Text, PanResponder } from 'react-native';
import useStyles from '@/src/hooks/useStyle';
import { Ionicons } from '@expo/vector-icons';

import SwipeItem from '../ui/swipe-item';

export interface DataBlockProps {
    title: string;
    data: any[];
    children?: React.ReactNode;
    handleDelete: (arr: string, index: number) => void;
    arr: string
}

const DataBlock = ({ title, data, handleDelete, arr }: DataBlockProps) => {
    const { styles } = useStyles();

    const onDismiss = (index: number) => {
        handleDelete(arr, index);
    }

    if (!data.length) return null

    return (
        <View style={styles.col}>
            <Text style={styles.text}>{title}</Text>
            <View style={styles.divider} />
            <View style={[styles.col]}>
                {data.map((item, index) => (
                    <SwipeItem key={index} handleDelete={() => onDismiss(index)}>
                        <Text style={styles.text}>{item}</Text>
                    </SwipeItem>
                ))}
            </View>
        </View>
    );
};

export default DataBlock;
