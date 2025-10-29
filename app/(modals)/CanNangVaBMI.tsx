import { AddRecordButton } from "@/components/component_BMI/AddRecordButton";
import AllHistory from "@/components/component_BMI/componentHistory";
import SoLieuThongKe from "@/components/component_BMI/soLieuThongKe";
import { BASE_URL } from "@/config";
import axios from "axios";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import BMIStatistic from "../../components/component_BMI/BMIStatistic";
import WeightStatistic from "../../components/component_BMI/CanNangStatistic";

export default function CanNangVaBMI() {

  // === STATE BMI ===
  const [bmiData, setBmiData] = useState({
    max: 23.4,
    min: 19.8,
    avg: 21.6,
    values: [20.0, 20.5, 21.0, 22.2],
    labels: ["T12", "T2", "T3", "T4"],
  });


  // === STATE Weight ===
  const [weightData, setWeightData] = useState({
    max: 70.5,
    min: 61.3,
    avg: 65.4,
    values: [62.0, 63.5, 64.0, 68.2, 70.5],
    labels: ["T1", "T22", "T3", "T4", "T5"],
  });

  // === fetch data API BMI ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        // ví dụ API gọi thực tế của bạn
        const res = await axios.get(`${BASE_URL}/api/CanNangVaBMI/getAll_BMI`);
        // Giả sử API trả về format tương tự
        setBmiData(res.data.data);

        // Fetch Weight
        const resWeight = await axios.get(`${BASE_URL}/api/CanNangVaBMI/getAll_CanNang`);
        setWeightData(resWeight.data.data);

      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {/* Cấu hình tiêu đề màn hình */}
      <Stack.Screen options={{ title: "Thống kê Cân Nặng & BMI" }} />

      {/* Nội dung chính */}
      <ScrollView
        style={{ flex: 1, backgroundColor: "#f3f4f6" }}
        contentContainerStyle={{ padding: 16 }}
      >
        <BMIStatistic
          max={bmiData.max}
          min={bmiData.min}
          avg={bmiData.avg}
          values={bmiData.values}
          labels={bmiData.labels}
        />

        <WeightStatistic
          max={weightData.max}
          min={weightData.min}
          avg={weightData.avg}
          values={weightData.values}
          labels={weightData.labels}
        />

        <AllHistory />

        <SoLieuThongKe />


      </ScrollView>

      <AddRecordButton />


    </>
  );
}
