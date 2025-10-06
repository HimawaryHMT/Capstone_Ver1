import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Stack } from "expo-router";


export default function LichSuVaThongKe() {
  return (
    <View style={styles.container} >
        <Stack.Screen options={{ title: "Lịch sử và thống kê uống nước" }} />
      {/* Header green */}

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Chi tiết</Text>
        <View style={styles.cardTabs}>
          <View style={styles.tab}>
            <Text style={styles.tabLabelMuted}>Tổng cộng</Text>
            <Text style={styles.tabValue}>0<Text style={styles.unit}>ml</Text></Text>
          </View>
          <View style={[styles.tab, styles.tabGoal]}>
            <Text style={styles.tabLabelMuted}>Mục tiêu</Text>
            <Text style={styles.tabValue}>2000<Text style={styles.unit}>ml</Text></Text>
          </View>
        </View>

        {/* Chart with Y-axis and data */}
        <View style={styles.chartContainer}>
          <View style={styles.yAxis}>
            <Text style={styles.yAxisLabel}>2800</Text>
            <Text style={styles.yAxisLabel}>2100</Text>
            <Text style={styles.yAxisLabel}>1400</Text>
            <Text style={styles.yAxisLabel}>700</Text>
            <Text style={styles.yAxisLabel}>0</Text>
          </View>

          <View style={styles.chart}>
            {/* Goal line */}
            <View style={styles.goalLine} />
            <View style={styles.goalMedal}>
              <Ionicons name="medal" size={16} color="#fbbf24" />
            </View>

            {/* Data bars */}
            <View style={styles.dataContainer}>
              <View style={styles.dataBar}><Text style={styles.dataValue}>0</Text></View>
              <View style={styles.dataBar}><Text style={styles.dataValue}>0</Text></View>
              <View style={styles.dataBar}><Text style={styles.dataValue}>0</Text></View>
              <View style={styles.dataBar}><Text style={styles.dataValue}>0</Text></View>
            </View>

            {/* X-axis dates */}
            <View style={styles.xAxis}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>9/25</Text>
                <Ionicons name="medal" size={12} color="#9ca3af" />
              </View>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>9/26</Text>
                <Ionicons name="medal" size={12} color="#9ca3af" />
              </View>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>9/27</Text>
                <Ionicons name="medal" size={12} color="#9ca3af" />
              </View>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>Hôm nay</Text>
                <Ionicons name="medal" size={12} color="#9ca3af" />
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.allHistoryBtn}>
          <Text style={styles.allHistoryText}>Tất cả lịch sử</Text>
        </TouchableOpacity>
      </View>

      {/* Reminder card */}
      <View style={styles.reminderCard}>
        <Text style={styles.reminderTitle}>Lời nhắc nhở</Text>
        <Text style={styles.reminderSub}>Lên lịch báo động thông minh cho sức khỏe</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>Thêm lời nhắc ▸</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.drinkBtn}>
        <Text style={styles.drinkBtnText}>+ Uống nước</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eaf4f1' , paddingTop: 28, paddingBottom: 18 },
  header: { backgroundColor: '#2e7d6b', paddingTop: 14, paddingBottom: 24, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { color: '#e6fff9', fontSize: 20, fontWeight: '800' },
  card: { backgroundColor: '#fff', marginHorizontal: 16, marginTop: -20, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#e5e7eb' },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a', marginBottom: 12 },
  cardTabs: { flexDirection: 'row', overflow: 'hidden', borderRadius: 12, backgroundColor: '#2e7d6b', marginBottom: 16 },
  tab: { flex: 1, padding: 12, alignItems: 'center' },
  tabGoal: { backgroundColor: '#2e7d6b' },
  tabLabelMuted: { color: '#e6fff9', fontWeight: '700', fontSize: 12 },
  tabValue: { fontSize: 20, fontWeight: '900', color: '#fff' },
  unit: { fontSize: 12, fontWeight: '700', color: '#e6fff9' },
  chartContainer: { flexDirection: 'row', height: 160, marginBottom: 8 },
  yAxis: { width: 40, justifyContent: 'space-between', paddingVertical: 8 },
  yAxisLabel: { fontSize: 12, fontWeight: '600', color: '#0f172a', textAlign: 'right' },
  chart: { flex: 1, position: 'relative', backgroundColor: '#eef2f7', borderRadius: 10, marginLeft: 8 },
  goalLine: { position: 'absolute', top: '25%', left: 0, right: 0, height: 1, borderStyle: 'dashed', borderWidth: 1, borderColor: '#2e7d6b' },
  goalMedal: { position: 'absolute', top: '20%', right: 8 },
  dataContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: '100%', paddingHorizontal: 8, paddingTop: 8 },
  dataBar: { alignItems: 'center', justifyContent: 'flex-end', height: '100%' },
  dataValue: { fontSize: 12, fontWeight: '600', color: '#0f172a', marginBottom: 4 },
  xAxis: { position: 'absolute', bottom: 8, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around' },
  dateContainer: { alignItems: 'center' },
  dateText: { fontSize: 12, fontWeight: '600', color: '#0f172a', marginBottom: 2 },
  allHistoryBtn: { backgroundColor: '#eef2f7', paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  allHistoryText: { fontWeight: '800', color: '#0f172a' },
  reminderCard: { backgroundColor: '#fff', marginHorizontal: 16, marginTop: 14, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#e5e7eb' },
  reminderTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  reminderSub: { color: '#6b7280', marginTop: 6 },
  addBtn: { alignSelf: 'flex-start', backgroundColor: '#2e7d6b', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, marginTop: 12 },
  addBtnText: { color: '#fff', fontWeight: '800' },
  drinkBtn: { backgroundColor: '#2e7d6b', margin: 16, paddingVertical: 14, borderRadius: 26, alignItems: 'center' },
  drinkBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
