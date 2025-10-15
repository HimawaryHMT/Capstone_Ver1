import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SectionHeaderProps {
    title: string;
    showSeeAll?: boolean;
    onSeeAllPress?: () => void;
}

export default function SectionHeader({ title, showSeeAll = true, onSeeAllPress }: SectionHeaderProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {showSeeAll && (
                <TouchableOpacity onPress={onSeeAllPress} style={styles.seeAllButton} activeOpacity={0.7}>
                    <Text style={styles.seeAllText}>Xem thêm</Text>
                    <Text style={styles.seeAllArrow}> ›</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 4,
    },
    seeAllText: {
        fontSize: 13,
        color: '#3F8F75',
        fontWeight: '600',
    },
    seeAllArrow: {
        fontSize: 16,
        color: '#3F8F75',
        fontWeight: '600',
        marginLeft: 2,
    },
});