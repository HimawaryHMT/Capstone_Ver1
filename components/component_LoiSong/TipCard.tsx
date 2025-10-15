import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TipCardProps {
    title: string;
    icon: string;
    backgroundColor: string;
    onPress?: () => void;
}

export default function TipCard({
    title,
    icon,
    backgroundColor,
    onPress
}: TipCardProps) {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor }]} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>{icon}</Text>
            </View>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 160,
        height: 160,
        borderRadius: 20,
        padding: 16,
        justifyContent: 'space-between',
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 32,
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
        lineHeight: 20,
    },
});