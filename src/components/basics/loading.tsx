import React from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';

const Loading = () => {
    // Crear una animación de tambaleo para los rayos de sol
    const bounceAnimation = new Animated.Value(0);
    const goUpAnimation = new Animated.Value(0);

    Animated.loop(
        Animated.sequence([
            Animated.timing(bounceAnimation, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
            Animated.timing(bounceAnimation, {
                toValue: -1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: false,
            }),

        ])
    ).start();

    Animated.loop(
        Animated.timing(goUpAnimation, {
            toValue: 1,
            duration: 5000,
            easing: Easing.ease,
            useNativeDriver: false,
        })
    ).start();


    // Calcular la rotación de los rayos de sol
    const bounce = bounceAnimation.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-10deg', '10deg'],
    });

    const goUp = goUpAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [100, -700],
    });

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('@/assets/images/basics/loading.png')}
                style={[styles.image, { transform: [{ rotate: bounce }] }]}
            />
            <Text style={styles.text}>Cargando...</Text>
            <View style={styles.bublesView}>
                <Animated.Image
                    source={require('@/assets/images/basics/bubles1.png')}
                    style={[styles.bubles, { transform: [{ translateY: goUp }] }]}
                />
                <Animated.Image
                    source={require('@/assets/images/basics/bubles2.png')}
                    style={[styles.bubles, { transform: [{ translateY: goUp }] }]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bublesView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 60
    },
    bubles: {
        width: 40,
        height: 40,
        marginHorizontal: 10,
    },
});

export default Loading;
