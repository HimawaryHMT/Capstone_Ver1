import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AllHistory() {
  const historyData = [
    { weight: 60.0, height: 165, bmi: 22.0, category: "Bình thường", date: "2025-09-28 22:54" },
  ];

  return (
    <>
      <Stack.Screen options={{ title: "Tất cả lịch sử" }} />

      <ScrollView style={styles.container} contentContainerStyle={{ padding: 10 }}>
        {historyData.map((item, index) => (
          <View key={index} style={styles.outerCard}>
            <Pressable
              style={styles.recordCard}
              onPress={() => router.push("../TatCaLichSuButton")}
            >
              <View style={styles.leftColumn}>
                <Text style={styles.weightText}>{item.weight.toFixed(1)}</Text>
                <Text style={styles.weightUnit}>Kg</Text>
              </View>

              <View style={styles.verticalLine} />

              <View style={styles.recordContent}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.detailText}>Height: {item.height}cm</Text>

                <View style={styles.bmiTag}>
                  <Text style={styles.bmiText}>BMI: {item.bmi.toFixed(1)}</Text>
                </View>

                <Text style={styles.recordDate}>{item.date}</Text>
              </View>

              <Ionicons name="chevron-forward" size={22} color="#9ca3af" />
            </Pressable>

            {/* ✅ Nút nhỏ nằm trong card lớn */}
            <Pressable style={styles.historyButton} >
              <Text style={styles.historyButtonText}>Tất cả lịch sử</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },

  outerCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },

  recordCard: {
    flexDirection: "row",
    alignItems: "center",
  },

  leftColumn: { width: 60, alignItems: "center" },
  weightText: { fontSize: 22, fontWeight: "bold", color: "#0f766e" },
  weightUnit: { fontSize: 12, color: "#6b7280", marginTop: -4 },

  verticalLine: { width: 3, height: "80%", backgroundColor: "#34d399", borderRadius: 2, marginHorizontal: 12 },

  recordContent: { flex: 1 },
  category: { fontSize: 15, fontWeight: "600", color: "#065f46" },
  detailText: { fontSize: 13, color: "#6b7280", marginTop: 2 },

  bmiTag: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  bmiText: { fontSize: 12, fontWeight: "600", color: "#334155" },

  recordDate: { fontSize: 12, color: "#9ca3af", marginTop: 4 },

  historyButton: {
    backgroundColor: "#e5e7eb",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 12,
  },
  historyButtonText: { fontWeight: "600", fontSize: 15, color: "#374151" },
});
