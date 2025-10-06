import { View, Text, StyleSheet } from "react-native";

export default function SoLieuThongKe() {
  return (
    <View style={styles.statsSection}>
      <Text style={styles.statsSectionTitle}>Số liệu thống kê</Text>

      {/* Donut Chart */}
      <View style={styles.donutContainer}>
        <View style={styles.donutChart}>
          <View style={styles.donutOuter}>
            <View style={styles.donutInner}>
              <Text style={styles.donutNumber}>1</Text>
              <Text style={styles.donutLabel}>In total</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        {[
          [
            { color: "#7c3aed", label: "Thiếu cân rất trầm trọng" },
            { color: "#3b82f6", label: "Thiếu cân nặng" },
          ],
          [
            { color: "#06b6d4", label: "Thiếu cân" },
            { color: "#10b981", label: "Bình thường" },
          ],
          [{ color: "#fbbf24", label: "Thừa cân" }],
          [
            { color: "#f97316", label: "Béo phì loại I" },
            { color: "#ef4444", label: "Béo phì độ II" },
          ],
          [{ color: "#dc2626", label: "Béo phì độ III" }],
        ].map((row, idx) => (
          <View key={idx} style={styles.legendRow}>
            {row.map((item, i) => (
              <View key={i} style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendText}>{item.label}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsSection: {
    padding: 18,
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    marginTop: -5,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  statsSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 14,
    color: "#111827",
    textAlign: "center",
  },

  donutContainer: { alignItems: "center", marginBottom: 18 },
  donutChart: { flexDirection: "row", alignItems: "center" },
  donutOuter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 10,
    borderColor: "#4ade80",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  donutInner: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  donutNumber: { fontSize: 22, fontWeight: "bold", color: "#111827" },
  donutLabel: { fontSize: 12, color: "#6b7280" },
  donutSideLabel: { marginLeft: 14, fontSize: 16, fontWeight: "bold", color: "#111827" },

  legend: { marginTop: 10 },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  legendItem: { flexDirection: "row", alignItems: "center", flex: 1 },
  legendDot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  legendText: { fontSize: 13, color: "#374151", flexShrink: 1 },
});
