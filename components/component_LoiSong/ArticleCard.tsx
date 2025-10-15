import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ArticleCardProps {
    title: string;
    subtitle: string;
    backgroundColor: string;
    icon: string;
    onPress?: () => void;
}

export default function ArticleCard({
    title,
    subtitle,
    backgroundColor,
    icon,
    onPress
}: ArticleCardProps) {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor }]} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
            </View>
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>{icon}</Text>
            </View>
            <View style={styles.checkmark}>
                <Text style={styles.checkmarkIcon}>✓</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        padding: 20,
        marginBottom: 12,
        minHeight: 100,
        position: 'relative',
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        paddingRight: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 6,
        lineHeight: 24,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '500',
    },
    iconContainer: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 40,
    },
    checkmark: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.95)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkIcon: {
        fontSize: 16,
        fontWeight: '700',
        color: '#22c55e',
    },
});