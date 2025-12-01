// WaterReminderScreen.tsx
import { Ionicons, MaterialCommunityIcons as MCI } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {

  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from 'expo-router';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Button_DieuChinhLuongNuoc1 from './ScreenNhacNhoUongNuoc/Button_DieuChinhLuongNuoc';

const THEME = {
  // Tươi & đậm hơn
  bgTop: '#e6fbff',
  bgBottom: '#d6f5ea',
  card: '#ffffff',
  textPrimary: '#0b1324',
  textMuted: '#5b6b81',
  // Accents đậm & rực hơn
  accentDeep: '#0284c7',   // cyan-600
  accentMint: '#10b981',   // emerald-500
  accentTeal: '#0f766e',   // teal-700 (đậm để nổi trên nền sáng)
  accentGlass: '#eafff7',
  chipBg: '#f0fffb',
  chipBorder: '#a7f3d0',
  glassBorder: '#a5e4d6',
  glassStrokeBg: '#d7f1ed',
  // Tăng nổi khối
  shadowTint: '#0b4d40',
};

export default function WaterReminderScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [waterAmount, setWaterAmount] = useState(200);
  const [totalDrank, setTotalDrank] = useState(0);
  const [lastDrink, setLastDrink] = useState<number | null>(null);
  const [goal, setGoal] = useState(2000);
  const [cups, setCups] = useState(0);

  const progress = useMemo(() => {
    const p = Math.min(100, Math.max(0, Math.round((totalDrank / goal) * 100)));
    return isFinite(p) ? p : 0;
  }, [totalDrank, goal]);

  const handleAdd = () => {
    setTotalDrank(prev => {
      const next = prev + waterAmount;
      if (next > goal * 3) Alert.alert('Cảnh báo', 'Bạn đã vượt quá mức hợp lý trong ngày!');
      return next;
    });
    setCups(c => c + 1);
    setLastDrink(waterAmount);
  };

  const handleMinus = () => {
    setTotalDrank(prev => Math.max(prev - waterAmount, 0));
    setCups(c => Math.max(c - 1, 0));
    setLastDrink(waterAmount * -1);
  };

  const handleResetToday = () => {
    setTotalDrank(0);
    setCups(0);
    setLastDrink(null);
  };

  // Progress ring
  const R = 70;
  const STROKE = 12;
  const CIRC = 2 * Math.PI * R;
  const offset = CIRC - (CIRC * progress) / 100;

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Stack.Screen options={{ title: 'Nhắc nhở uống nước' }} />

      {/* HEADER */}
      <View style={styles.headerTop}>
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>💧 Uống nước nào!</Text>
          <View style={styles.goalBadge}>
            <Ionicons name="flag-outline" size={14} color={THEME.accentTeal} />
            <Text style={styles.goalBadgeText}>{goal}ml</Text>
          </View>
        </View>
        <Text style={styles.subTitle}>Giữ cơ thể tươi mát mỗi ngày</Text>
      </View>

      {/* CARD PROGRESS */}
      <View style={styles.headerWrap}>
        <View style={styles.ringCard}>
          <Svg width={200} height={200} viewBox="0 0 200 200" style={{ zIndex: 1 }}>
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor={THEME.accentMint} />
                <Stop offset="100%" stopColor={THEME.accentDeep} />
              </LinearGradient>
              <LinearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#ffffff" />
                <Stop offset="1" stopColor="#f5fffb" />
              </LinearGradient>
            </Defs>

            {/* track */}
            <Circle
              cx="100"
              cy="100"
              r={R}
              stroke={THEME.glassStrokeBg}
              strokeWidth={STROKE}
              fill="none"
            />
            {/* progress */}
            <Circle
              cx="100"
              cy="100"
              r={R}
              stroke="url(#grad)"
              strokeWidth={STROKE}
              fill="none"
              strokeDasharray={`${CIRC} ${CIRC}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
            {/* glow */}
            <Circle
              cx="100"
              cy="100"
              r={R}
              stroke={THEME.accentMint + '22'}
              strokeWidth={STROKE + 6}
              fill="none"
              opacity={0.4}
            />
          </Svg>

          <View style={styles.centerStat}>
            <Text style={styles.totalMl}>{totalDrank}ml</Text>
            <View style={styles.pctRow}>
              <Ionicons name="water-outline" size={16} color={THEME.accentTeal} />
              <Text style={styles.progressPct}>{progress}%</Text>
            </View>
            <Text style={styles.subtleText}>Hôm nay</Text>
          </View>

          {/* card gradient backdrop (subtle) */}
          <View style={styles.ringBackdrop} />
        </View>

        {/* Chips */}
        <View style={styles.infoRowGroup}>
          <View style={styles.infoChip}>
            <MCI name="cup" size={18} color={THEME.textPrimary} />
            <Text style={styles.infoChipValue}>{goal}ml</Text>
            <Text style={styles.infoChipLabel}>Mục tiêu</Text>
          </View>

          <View style={styles.infoChip}>
            <MCI name="cup-outline" size={18} color={THEME.textPrimary} />
            <Text style={styles.infoChipValue}>
              {lastDrink === null ? '—' : `${Math.abs(lastDrink)}ml ${lastDrink > 0 ? '' : '(trừ)'}`}
            </Text>
            <Text style={styles.infoChipLabel}>Lần gần nhất</Text>
          </View>

          <View style={styles.infoChip}>
            <MCI name="glass-cocktail" size={18} color={THEME.textPrimary} />
            <Text style={styles.infoChipValue}>{cups} lần</Text>
            <Text style={styles.infoChipLabel}>Số lần</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.historyBtn}
          onPress={() => router.push('/ScreenNhacNhoUongNuoc/LichSuVaThongKe')}
        >
          <Text style={styles.historyBtnText}>Lịch sử & Thống kê</Text>
          <Ionicons name="chevron-forward" size={16} color={THEME.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Wave */}
      <Svg height={140} width="100%" viewBox="0 0 1440 320" style={styles.waveSvg} accessible accessibilityLabel="Nền sóng trang trí">
        <Defs>
          <LinearGradient id="wave" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#7cd9c8" />
            <Stop offset="1" stopColor="#a8e6ff" />
          </LinearGradient>
        </Defs>
        <Path
          fill="url(#wave)"
          d="M0,128L40,138.7C80,149,160,171,240,176C320,181,400,171,480,149.3C560,128,640,96,720,101.3C800,107,880,149,960,165.3C1040,181,1120,171,1200,154.7C1280,139,1360,117,1400,117.3L1440,117V320H0Z"
        />
      </Svg>

      {/* Bottom actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.roundBtn} onPress={handleMinus} accessibilityRole="button" accessibilityLabel="Trừ lượng nước">
          <Ionicons name="remove" size={28} color="#0b4d40" />
        </TouchableOpacity>

        <View style={styles.centerGlass}>
          <TouchableOpacity onPress={handleAdd} accessibilityRole="button" accessibilityLabel="Thêm lượng nước">
            <Ionicons name="add" size={36} color="#0b4d40" />
          </TouchableOpacity>
          <Text style={styles.centerHint}>+{waterAmount}ml</Text>
        </View>

        <TouchableOpacity
          style={styles.roundBtn}
          onPress={() => setModalVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="Điều chỉnh dung tích mỗi lần uống"
        >
          <FontAwesome6 name="bottle-water" size={30} color="#0b4d40" />
        </TouchableOpacity>
      </View>

      {/* Bottom row */}
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => setGoal(g => (g === 2000 ? 2500 : 2000))}
        >
          <Ionicons name="flag-outline" size={16} color={THEME.accentTeal} />
          <Text style={styles.secondaryBtnText}>Mục tiêu: {goal}ml</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={handleResetToday}>
          <Ionicons name="refresh-outline" size={16} color={THEME.accentTeal} />
          <Text style={styles.secondaryBtnText}>Làm mới</Text>
        </TouchableOpacity>
      </View>

      <Button_DieuChinhLuongNuoc1
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        waterAmount={waterAmount}
        setWaterAmount={setWaterAmount}
      />
    </SafeAreaView>
  );
}

const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  android: { elevation: 6 },
  default: {},
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Gradient-ish background bằng 2 màu (không cần lib):
    backgroundColor: THEME.bgTop,
     paddingBottom: 40,
  },
  headerTop: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '900',
    color: THEME.textPrimary,
  },
  subTitle: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 4,
  },
  goalBadge: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: THEME.chipBg,
    borderWidth: 1,
    borderColor: THEME.chipBorder,
    borderRadius: 999,
    ...shadow,
  },
  goalBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.accentTeal,
  },

  headerWrap: { paddingTop: 6, paddingHorizontal: 16 },

  ringCard: {
    alignSelf: 'center',
    width: 270,
    height: 270,
    borderRadius: 28,
    backgroundColor: THEME.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    overflow: 'hidden',
    ...shadow,
  },
  ringBackdrop: {
    position: 'absolute',
    inset: 0,
    opacity: 0.65,
    backgroundColor: '#ffffff00',
  },
  centerStat: { position: 'absolute', alignItems: 'center' },
  totalMl: { fontSize: 30, fontWeight: '900', color: THEME.textPrimary },
  pctRow: { marginTop: 6, flexDirection: 'row', alignItems: 'center', gap: 6 },
  progressPct: { fontSize: 18, fontWeight: '800', color: THEME.accentTeal },
  subtleText: { fontSize: 12, color: THEME.textMuted, marginTop: 6 },

  infoRowGroup: { marginTop: 12, flexDirection: 'row', gap: 10 },
  infoChip: {
    flex: 1,
    backgroundColor: THEME.card,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.glassBorder,
    ...shadow,
  },
  infoChipValue: { fontSize: 16, fontWeight: '800', color: THEME.textPrimary, marginTop: 6 },
  infoChipLabel: { fontSize: 12, color: THEME.textMuted, marginTop: 2 },

  historyBtn: {
    marginTop: 14,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: THEME.card,
    borderWidth: 1,
    borderColor: THEME.glassBorder,
    ...shadow,
  },
  historyBtnText: { fontSize: 14, fontWeight: '800', color: THEME.textPrimary },

  waveSvg: { marginTop: 12, opacity: 0.95 },

  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    alignItems: 'flex-end',
    marginTop: -6,
  },
  roundBtn: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: THEME.accentGlass,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: THEME.glassBorder,
    ...shadow,
  },
  centerGlass: {
    width: 128,
    height: 128,
    backgroundColor: THEME.accentGlass,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: THEME.glassBorder,
    ...shadow,
  },
  centerHint: { marginTop: 6, fontSize: 12, fontWeight: '700', color: '#0b4d40' },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingHorizontal: 20,
    gap: 10,
   
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: THEME.card,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: THEME.glassBorder,
    ...shadow,
  },
  secondaryBtnText: { fontSize: 13, fontWeight: '800', color: THEME.accentTeal },
});
