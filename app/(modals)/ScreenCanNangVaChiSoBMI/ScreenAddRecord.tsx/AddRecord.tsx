// AddRecordPage.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import TopAddRecord from "./TopAddRecord";
import BottomAddRecord from "./BottomAddRecord";

export default function AddRecordPage() {
  const router = useRouter();
  const [weight, setWeight] = useState("60,0");
  const [height, setHeight] = useState("165,0");

  // Tính BMI
  const calculateBMI = () => {
    const w = parseFloat(weight.replace(",", "."));
    const h = parseFloat(height.replace(",", ".")) / 100;
    if (w && h) return (w / (h * h)).toFixed(1);
    return "0.0";
  };
  const bmi = parseFloat(calculateBMI());

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <Stack.Screen options={{ title: "Kỷ lục mới" }} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        {/* Thông tin cân nặng & chiều cao */}
        <TopAddRecord
          weight={weight}
          setWeight={setWeight}
          height={height}
          setHeight={setHeight}
          bmi={bmi}
        />

        {/* Ngày & Giờ Section */}
        <View style={styles.dateTimeSection}>
          <Text style={styles.dateTimeTitle}>Ngày & Giờ</Text>
          <Pressable style={styles.addNoteBtn}>
            <Text style={styles.addNoteBtnText}>Ghi chú +</Text>
          </Pressable>
        </View>

        {/* Time Picker Card */}
        <BottomAddRecord
          previousDate="2024 tháng 9 27"
          previousHour="21"
          previousMinute="53"
          currentDate="2025 tháng 9 28"
          currentHour="22"
          currentMinute="54"
          nextDate=""
          nextHour="23"
          nextMinute="55"
        />

        {/* Bottom space */}
        <View style={{ height: 200 }} />
      </ScrollView>
        {/* Nút Lưu */}
        {/* Nút Lưu trữ */}
<Pressable style={styles.saveBtn} >
  <Text style={styles.saveBtnText}>Lưu trữ</Text>
</Pressable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  scrollView: {
    backgroundColor: "#f0f4f8",
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
  },
  dateTimeSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  dateTimeTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  addNoteBtn: {
    backgroundColor: "#06b6d4",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addNoteBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  saveBtn: {
  backgroundColor: "#10b981",
  paddingVertical: 12,
  borderRadius: 30,
  alignItems: "center",
  marginTop: 16,
    marginBottom: 20,
    width : "90%",
    alignSelf: "center",
},
saveBtnText: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "700",
},

});
