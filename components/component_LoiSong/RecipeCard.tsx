import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RecipeCardProps {
    title: string;
    imageEmoji: string;
    backgroundColor?: string;
    onPress?: () => void;
}

export default function RecipeCard({
    title,
    imageEmoji,
    backgroundColor = '#f3f4f6',
    onPress
}: RecipeCardProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
            <View style={[styles.imageContainer, { backgroundColor }]}>
                <Text style={styles.imageEmoji}>{imageEmoji}</Text>
            </View>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 140,
    },
    imageContainer: {
        width: 140,
        height: 140,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    imageEmoji: {
        fontSize: 64,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
        lineHeight: 18,
    },
});