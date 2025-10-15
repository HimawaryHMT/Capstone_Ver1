import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface VideoCardProps {
    title: string;
    imageUrl?: string;
    backgroundColor?: string;
    onPress?: () => void;
}

export default function VideoCard({
    title,
    imageUrl,
    backgroundColor = '#e5e7eb',
    onPress
}: VideoCardProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
            <View style={[styles.imageContainer, { backgroundColor }]}>
                <View style={styles.overlay}>
                    <View style={styles.playButton}>
                        <Text style={styles.playIcon}>▶</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 160,
    },
    imageContainer: {
        width: 160,
        height: 160,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 8,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255,255,255,0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    playIcon: {
        fontSize: 20,
        color: '#1a1a1a',
        marginLeft: 4,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
        lineHeight: 18,
    },
});