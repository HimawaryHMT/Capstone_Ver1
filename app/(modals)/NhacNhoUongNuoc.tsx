import { Ionicons, MaterialCommunityIcons as MCI } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Pressable } from 'react-native';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Button_DieuChinhLuongNuoc1 from './ScreenNhacNhoUongNuoc/Button_DieuChinhLuongNuoc';

export default function WaterReminderScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [waterAmount, setWaterAmount] = useState(200); // Default 200ml
  const [totalDrank, setTotalDrank] = useState(0); // giá trị bắt đầu



  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Nhắc nhở uống nước' }} />

      {/* Total today */}
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>0ml</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <MCI name="cup" size={16} color="#111" />
            <Text style={styles.infoLabel}> Mục tiêu hàng ngày:</Text>
            <Text style={styles.infoValue}>2000ml</Text>
          </View>

          <View style={styles.infoRow}>
            <MCI name="cup-outline" size={16} color="#111" />
            <Text style={styles.infoLabel}> Thức uống cuối cùng:</Text>
            <Text style={styles.infoValueMuted}>{totalDrank}ml</Text>
          </View>

          <View style={styles.infoRow}>
            <MCI name="cup" size={16} color="#111" />
            <Text style={styles.infoLabel}> Số lần uống nước:</Text>
            <Text style={styles.infoValue}>0 Tách</Text>
          </View>

          <TouchableOpacity style={styles.historyLink} onPress={() => router.push('/ScreenNhacNhoUongNuoc/LichSuVaThongKe')}>
            <Text style={styles.historyText}>Lịch sử và Thống kê</Text>
            <Ionicons name="chevron-forward" size={16} color="#111827" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }} />

      {/* Bottom Curved Background */}
      <View style={styles.bottomWrapper}>
        <Svg
          height={200}
          width="100%"
          viewBox="0 0 1440 20"
          style={styles.svgCurve}
        >
          <Path
            fill="#5faf9f"
            d="
              M0,-300
              L48,-310
              C96,-320,192,-345,288,-310
              C384,-280,480,-195,576,-185
              C672,-175,768,-235,864,-255
              C960,-275,1056,-255,1152,-265
              C1248,-275,1344,-315,1392,-335
              L1440,-350
              V320
              H0
              Z
            "
          />
        </Svg>

        {/* Bottom Actions */}
        <View style={styles.bottomArea}>
          <View style={styles.progressTag}>
            <Text style={styles.progressText}>0%</Text>
          </View>

          <TouchableOpacity
            style={styles.minusBtn}
            onPress={() => {
              setTotalDrank(prev => Math.max(prev - waterAmount, 0));
            }}
          >
            <Ionicons name="remove" size={24} color="#0b4d40" />
          </TouchableOpacity>

          <View style={styles.centerGlass}>
            <TouchableOpacity
              onPress={() => setTotalDrank(prev => prev + waterAmount)}
            >
              <Ionicons name="add" size={32} color="#0b4d40" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.bottleBtn}
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome6
              name="bottle-water"
              size={34}
              color="blue"
              style={{ transform: [{ rotate: '30deg' }] }}
            />
          </TouchableOpacity>
          <Text style={styles.bottleSize}>{waterAmount}ml</Text>
        </View>
      </View>

      {/* ✅ MODAL BOTTOM SHEET */}
      <Button_DieuChinhLuongNuoc1
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        waterAmount={waterAmount}
        setWaterAmount={setWaterAmount}
      />



    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eaf4f1' },

  totalBox: { alignItems: 'center', marginTop: 20 },
  totalText: { fontSize: 56, fontWeight: '900', color: '#0f172a' },

  infoCard: {
    marginTop: 16,
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  infoLabel: { fontSize: 16, color: '#0f172a' },
  infoValue: { fontSize: 16, color: '#0f172a', marginLeft: 'auto', fontWeight: '700' },
  infoValueMuted: { fontSize: 16, color: '#6b7280', marginLeft: 'auto' },

  historyLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  historyText: { fontSize: 16, fontWeight: '800', color: '#0f172a', marginRight: 6 },

  callToActionBox: {
    backgroundColor: '#fbbf24',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
  },
  callToActionContent: { flexDirection: 'row', alignItems: 'center' },
  callToActionIcon: { marginRight: 12, position: 'relative' },
  bottleIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fbbf24',
    borderRadius: 8,
    padding: 2,
  },
  callToActionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0b4d40',
    lineHeight: 20,
  },

  bottomWrapper: {
    width: '100%',
    height: 220,
    position: 'relative',
  },
  svgCurve: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  bottomArea: {
    height: 240,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  progressTag: {
    position: 'absolute',
    left: 10,
    top: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  progressText: { fontWeight: '800', color: '#0b4d40' },

  minusBtn: {
    position: 'absolute',
    left: 40,
    bottom: 65,
    width: 65,
    height: 65,
    borderRadius: 28,
    backgroundColor: '#e6fff9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerGlass: {
    width: 90,
    height: 90,
    backgroundColor: '#e6fff9',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#ccefe6',
    marginBottom: 75,
  },

  bottleBtn: {
    position: 'absolute',
    right: 40,
    bottom: 65,
    width: 65,
    height: 65,
    borderRadius: 28,
    backgroundColor: '#e6fff9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottleSize: {
    position: 'absolute',
    right: 50,
    bottom: 40,
    color: '#e6fff9',
    fontWeight: '800',
    fontSize: 15,
  },

  // ✅ Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 15,
  },
  unitSwitch: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  unitText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  unitMlActive: {
    color: '#0b4d40',
    borderBottomWidth: 2,
    borderColor: '#0b4d40',
  },
  unitTextDisabled: {
    color: '#aaa',
  },
  waterAmountText: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
    color: '#0b4d40',
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  sliderMarks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: -10,
  },
  markContainer: {
    alignItems: 'center',
  },
  markLine: {
    width: 2,
    height: 10,
    backgroundColor: '#0b4d40',
    marginBottom: 2,
  },
  markText: {
    fontSize: 12,
    color: '#0f172a',
  },
  confirmBtn: {
    backgroundColor: '#0b4d40',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
