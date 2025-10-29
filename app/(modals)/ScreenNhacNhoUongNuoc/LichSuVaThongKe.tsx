// LichSuVaThongKe.tsx
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LichSuVaThongKe() {
  // ======= MOCK DATA (có thể thay bằng API) =======
  const goalMl = 2000;
  const days = useMemo(
    () => [
      { label: "9/25", value: 1200 },
      { label: "9/26", value: 1950 },
      { label: "9/27", value: 800 },
      { label: "Hôm nay", value: 0 },
    ],
    []
  );

  const total = useMemo(() => days.reduce((s, d) => s + d.value, 0), [days]);
  const maxY = useMemo(
    () => Math.max(goalMl * 1.4, ...days.map((d) => d.value), goalMl),
    [days, goalMl]
  );

  const yTicks = useMemo(() => {
    // 5 tick: 0%, 25%, 50%, 75%, 100% của maxY (round gần 100)
    const step = Math.ceil(maxY / 4 / 100) * 100;
    return [step * 4, step * 3, step * 2, step, 0];
  }, [maxY]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Lịch sử & thống kê uống nước" }} />

      {/* ======= CARD CHI TIẾT / THỐNG KÊ NHANH ======= */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Chi tiết</Text>

        <View style={styles.statsRow}>
          <View style={[styles.statPill, styles.statPrimary]}>
            <View style={styles.statIcon}>
              <Ionicons name="water-outline" size={18} color="#0b3b33" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.statLabel}>Tổng cộng</Text>
              <Text style={styles.statValue}>
                {total}
                <Text style={styles.unit}> ml</Text>
              </Text>
            </View>
          </View>

          <View style={[styles.statPill, styles.statGoal]}>
            <View style={styles.statIcon}>
              <Ionicons name="trophy-outline" size={18} color="#624500" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.statLabel}>Mục tiêu</Text>
              <Text style={styles.statValue}>
                {goalMl}
                <Text style={styles.unit}> ml</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* ======= BIỂU ĐỒ CỘT ======= */}
        <View style={styles.chartWrap}>
          {/* Y Axis */}
          <View style={styles.yAxis}>
            {yTicks.map((tick, idx) => (
              <Text key={idx} style={styles.yAxisLabel}>
                {tick}
              </Text>
            ))}
          </View>

          {/* Chart area */}
          <View style={styles.chartArea}>
            {/* Goal dashed line */}
            <View
              style={[
                styles.goalLine,
                { top: `${100 - (goalMl / maxY) * 100}%` },
              ]}
            />
            <View
              style={[
                styles.goalMedal,
                { top: `${100 - (goalMl / maxY) * 100 + 2}%` },
              ]}
            >
              <Ionicons name="medal" size={16} color="#fbbf24" />
            </View>

            {/* Bars */}
            <View style={styles.barsRow}>
              {days.map((d, i) => {
                const hPct = (d.value / maxY) * 100;
                const meetGoal = d.value >= goalMl;
                return (
                  <View key={i} style={styles.barCol}>
                    {/* value label */}
                    <Text style={styles.barValue}>{d.value}</Text>

                    {/* bar */}
                    <View style={styles.barTrack}>
                      <View
                        style={[
                          styles.barFill,
                          {
                            height: `${Math.max(2, hPct)}%`,
                            backgroundColor: meetGoal ? "#10b981" : "#7dd3fc",
                          },
                        ]}
                      />
                    </View>

                    {/* X label */}
                    <View style={styles.dateContainer}>
                      <Text
                        style={[
                          styles.dateText,
                          d.label === "Hôm nay" && styles.dateToday,
                        ]}
                      >
                        {d.label}
                      </Text>
                      <Ionicons
                        name="medal"
                        size={12}
                        color={meetGoal ? "#fbbf24" : "#9ca3af"}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Nút xem tất cả lịch sử */}
        <TouchableOpacity
          style={styles.allHistoryBtn}
        //  onPress={() => router.push("/history")}
          activeOpacity={0.85}
        >
          <Text style={styles.allHistoryText}>
            Tất cả lịch sử{" "}
            <Ionicons name="chevron-forward" size={16} color="#0f172a" />
          </Text>
        </TouchableOpacity>
      </View>

      {/* ======= CARD LỜI NHẮC ======= */}
      <View style={styles.reminderCard}>
        <View style={styles.reminderHeader}>
          <Ionicons name="alarm-outline" size={18} color="#0b3b33" />
          <Text style={styles.reminderTitle}>Lời nhắc nhở</Text>
        </View>
        <Text style={styles.reminderSub}>
          Lên lịch báo động thông minh cho sức khỏe
        </Text>

        <TouchableOpacity
          style={styles.addBtn}
        //  onPress={() => router.push("/reminders/new")}
          activeOpacity={0.9}
        >
          <Text style={styles.addBtnText}>Thêm lời nhắc</Text>
          <Ionicons name="add-circle" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ======= FLOAT ACTION ======= */}
      <TouchableOpacity
        style={styles.drinkBtn}
        onPress={() => router.back()}
        activeOpacity={0.9}
      >
        <Ionicons name="water" size={18} color="#fff" />
        <Text style={styles.drinkBtnText}>Uống nước</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: "#eaf4f1",
    paddingTop: 8,
    paddingBottom: 24,
  },

  // Card chung
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    // shadow
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 12,
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  statPill: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  statPrimary: {
    backgroundColor: "#dcfce7", // emerald-100
  },
  statGoal: {
    backgroundColor: "#fef3c7", // amber-100
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0f172a",
  },
  unit: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6b7280",
  },

  // Chart
  chartWrap: {
    flexDirection: "row",
    height: 180,
    marginTop: 4,
    marginBottom: 10,
  },
  yAxis: {
    width: 44,
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  yAxisLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0f172a",
    textAlign: "right",
  },
  chartArea: {
    flex: 1,
    position: "relative",
    backgroundColor: "#eef2f7",
    borderRadius: 12,
    marginLeft: 8,
    overflow: "hidden",
  },
  goalLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#2e7d6b",
  },
  goalMedal: {
    position: "absolute",
    right: 8,
  },
  barsRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingBottom: 28, // chừa chỗ cho nhãn ngày
    paddingTop: 8,
  },
  barCol: {
    width: 54,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  barValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },
  barTrack: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
    backgroundColor: "#e5e7eb",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  dateContainer: {
    position: "absolute",
    bottom: 6,
    alignItems: "center",
  },
  dateText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 2,
  },
  dateToday: {
    color: "#0ea5a3",
  },

  // Nút tất cả lịch sử
  allHistoryBtn: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
  },
  allHistoryText: {
    fontWeight: "800",
    color: "#0f172a",
  },

  // Reminder card
  reminderCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    gap: 10,
  },
  reminderHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
  },
  reminderSub: {
    color: "#64748b",
  },
  addBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#2e7d6b",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "800",
  },

  // FAB
  drinkBtn: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#2e7d6b",
    paddingVertical: 14,
    borderRadius: 26,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  drinkBtnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});
