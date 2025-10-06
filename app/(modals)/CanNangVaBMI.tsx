import { ScrollView } from "react-native";
import { Stack } from "expo-router";
import BMIStatistic from "../../components/component_BMI/BMIStatistic";
import WeightStatistic from "../../components/component_BMI/CanNangStatistic";
import AllHistory from "@/components/component_BMI/componentHistory";
import SoLieuThongKe from "@/components/component_BMI/soLieuThongKe";
import { AddRecordButton } from "@/components/component_BMI/AddRecordButton";


export default function CanNangVaBMI() {
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
          max={23.4}
          min={19.8}
          avg={21.6}
          values={[20.0, 20.5, 21.0, 22.2, 23.4]}
          labels={["T1", "T2", "T3", "T4", "T5"]}
        />

        <WeightStatistic
          max={70.5}
          min={61.3}
          avg={65.4}
          values={[62.0, 63.5, 64.0, 68.2, 70.5]}
          labels={["T1", "T2", "T3", "T4", "T5"]}
        />

        <AllHistory />

        <SoLieuThongKe />
        
       
      </ScrollView>

      <AddRecordButton />


    </>
  );
}
