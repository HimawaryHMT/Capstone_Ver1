// TimePickerCard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface TimePickerCardProps {
    previousDate?: string;
    previousHour?: string;
    previousMinute?: string;
    currentDate: string;
    currentHour: string;
    currentMinute: string;
    nextDate?: string;
    nextHour?: string;
    nextMinute?: string;
}

export default function TimePickerCard({
    previousDate = "",
    previousHour = "",
    previousMinute = "",
    currentDate,
    currentHour,
    currentMinute,
    nextDate = "",
    nextHour = "",
    nextMinute = "",
}: TimePickerCardProps) {
    return (
        <View style={styles.timePickerCard}>
            {/* Previous Date Row */}
            <View style={styles.timeRow}>
                <Text style={styles.timeText}>{previousDate}</Text>
                <Text style={styles.timeText}>{previousHour}</Text>
                <Text style={styles.timeText}>{previousMinute}</Text>
            </View>

            {/* Current Date Row (Selected) */}
            <View style={[styles.timeRow, styles.timeRowSelected]}>
                <Text style={styles.timeTextSelected}>{currentDate}</Text>
                <Text style={styles.timeTextSelected}>{currentHour}</Text>
                <Text style={styles.timeSeparator}>:</Text>
                <Text style={styles.timeTextSelected}>{currentMinute}</Text>
            </View>

            {/* Next Date Row */}
            <View style={styles.timeRow}>
                <Text style={styles.timeText}>{nextDate}</Text>
                <Text style={styles.timeText}>{nextHour}</Text>
                <Text style={styles.timeText}>{nextMinute}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    timePickerCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    timeRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 12,
    },
    timeRowSelected: {
        backgroundColor: "#d1fae5",
        borderRadius: 12,
        marginVertical: 4,
    },
    timeText: {
        fontSize: 16,
        color: "#9ca3af",
        flex: 1,
        textAlign: "center",
    },
    timeTextSelected: {
        fontSize: 18,
        color: "#111827",
        fontWeight: "700",
        flex: 1,
        textAlign: "center",
    },
    timeSeparator: {
        fontSize: 18,
        color: "#111827",
        fontWeight: "700",
    },
});
