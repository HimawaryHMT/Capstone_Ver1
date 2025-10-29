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
    <View style={styles.card} accessible accessibilityLabel="Thời gian đã chọn">
      {/* Previous */}
      <View style={styles.row}>
        <View style={styles.leftBlock}>
          <Text style={styles.caption}>Trước đó</Text>
          <Text style={styles.dateMuted} numberOfLines={1}>
            {previousDate || "—"}
          </Text>
        </View>

        <View style={styles.timePillMuted} accessibilityRole="text">
          <Text style={styles.timeMuted}>{previousHour || "--"}</Text>
          <Text style={styles.sepMuted}>:</Text>
          <Text style={styles.timeMuted}>{previousMinute || "--"}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Current */}
      <View style={[styles.row, styles.currentRow]} accessibilityLabel="Thời gian hiện tại">
        <View style={styles.leftBlock}>
          <Text style={[styles.caption, styles.captionCurrent]}>Đang chọn</Text>
          <Text style={styles.date} numberOfLines={1}>
            {currentDate}
          </Text>
        </View>

        <View style={styles.timePillActive}>
          <Text style={styles.time}>{currentHour}</Text>
          <Text style={styles.sep}>:</Text>
          <Text style={styles.time}>{currentMinute}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Next */}
      <View style={styles.row}>
        <View style={styles.leftBlock}>
          <Text style={styles.caption}>Tiếp theo</Text>
          <Text style={styles.dateMuted} numberOfLines={1}>
            {nextDate || "—"}
          </Text>
        </View>

        <View style={styles.timePillMuted}>
          <Text style={styles.timeMuted}>{nextHour || "--"}</Text>
          <Text style={styles.sepMuted}>:</Text>
          <Text style={styles.timeMuted}>{nextMinute || "--"}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Card container
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginVertical: 12,
    // Android shadow
    elevation: 3,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },

  // Rows
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    justifyContent: "space-between",
    gap: 12,
  },
  currentRow: {
    backgroundColor: "#ecfdf5", // nhẹ hơn #dcfce7 để dịu mắt
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 10,
  },

  // Left block (labels + date)
  leftBlock: {
    flex: 1,
    minWidth: 0, // cho phép text ellipsis
  },
  caption: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
    color: "#6b7280",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  captionCurrent: {
    color: "#059669",
  },

  // Date text
  date: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  dateMuted: {
    fontSize: 15,
    fontWeight: "600",
    color: "#9ca3af",
  },

  // Time pills
  timePillActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10b981",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    minWidth: 96,
    justifyContent: "center",
  },
  timePillMuted: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 12,
    minWidth: 92,
    justifyContent: "center",
  },

  // Time text
  time: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.5,
    includeFontPadding: false,
  },
  timeMuted: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6b7280",
    letterSpacing: 0.4,
    includeFontPadding: false,
  },

  // Separators
  sep: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
    marginHorizontal: 4,
    includeFontPadding: false,
  },
  sepMuted: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6b7280",
    marginHorizontal: 4,
    includeFontPadding: false,
  },

  // Divider between rows (subtle)
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(17,24,39,0.06)", // #111827 @ 6%
    marginHorizontal: 2,
  },
});
