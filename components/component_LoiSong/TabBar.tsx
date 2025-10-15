import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Tab {
    id: string;
    label: string;
}

interface TabBarProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export default function TabBar({ tabs, activeTab, onTabChange }: TabBarProps) {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {tabs.map((tab) => {
                    const isActive = tab.id === activeTab;
                    return (
                        <TouchableOpacity
                            key={tab.id}
                            style={[styles.tab, isActive && styles.activeTab]}
                            onPress={() => onTabChange(tab.id)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 6,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 18,
        backgroundColor: '#f3f4f6',
        marginRight: 6,
        minWidth: 80,
    },
    activeTab: {
        backgroundColor: '#3F8F75',
    },
    tabText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6b7280',
        textAlign: 'center',
    },
    activeTabText: {
        color: '#fff',
    },
});