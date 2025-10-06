import { chartStyles  } from "../charts/chartStyle";
import  MiniBars  from "../charts/MiniBars";
import { View, Text } from "react-native";
import Stat from "../charts/Stat";

/* ========================= BMIStatistic Component ========================= */

export default function WeightStatistic({ max, min, avg, values, labels }: any) {
  return (
    <View style={chartStyles.card}>
      <View style={chartStyles.header}>
        <Text style={chartStyles.title}>Cân nặng</Text>
        <Text style={chartStyles.unit}>Unit:kg</Text>
      </View>
      <View style={chartStyles.statsRow}>
        <Stat label="Max" value={max} />
        <Stat label="Min" value={min} />
        <Stat label="Trung bình" value={avg} />
      </View>
      <MiniBars
        values={values}
        min={55}
        max={75}
        yTicks={[75, 71, 67, 63, 59, 55]}
        showYAxis={true}
        labels={labels}
        barColor="#86efac"
        dotColor="#22c55e"
      />
    </View>
  );
}
