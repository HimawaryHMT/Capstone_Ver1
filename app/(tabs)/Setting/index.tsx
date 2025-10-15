import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View, Button } from 'react-native';
import { useRouter } from 'expo-router';

// ======================= TÍCH HỢP HÀNH VI ĐĂNG XUẤT =======================
export default function TabTwoScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    router.replace('../Auth/Login');
  };

  // ======================= CÁC HÀM XỬ LÝ =======================
  const handleLanguagePress = () => {
    Alert.alert('Ngôn ngữ', 'Chức năng này sẽ được cập nhật trong phiên bản tiếp theo', [{ text: 'OK' }]);
  };

  const handleExportData = () => {
    Alert.alert('Xuất dữ liệu', 'Bạn có muốn xuất dữ liệu của mình không?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Xuất', onPress: () => Alert.alert('Thành công', 'Dữ liệu đã được xuất thành công') }
    ]);
  };

  const handleProfilePress = () => {
    Alert.alert('Hồ sơ', 'Chức năng này sẽ được cập nhật trong phiên bản tiếp theo', [{ text: 'OK' }]);
  };

  const handleRateApp = () => {
    Alert.alert('Đánh giá ứng dụng', 'Bạn có muốn đánh giá không?', [
      { text: 'Không', style: 'cancel' },
      { text: 'Đánh giá', onPress: () => Alert.alert('Cảm ơn', 'Cảm ơn bạn đã đánh giá ứng dụng!') }
    ]);
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Chính sách bảo mật', 'Chức năng này sẽ được cập nhật trong phiên bản tiếp theo', [{ text: 'OK' }]);
  };

  // ======================= COMPONENT CON =======================

  function SettingsSectionHeader({ label }: { label: string }) {
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderText}>{label}</Text>
      </View>
    );
  }

  function SettingsRow({ icon, label, children, onPress, disabled = false, description }: any) {
    const Content = (
      <View style={[styles.rowContainer, disabled && styles.rowDisabled]}>
        <View style={styles.rowLeft}>
          {icon && <View style={[styles.iconContainer, disabled && styles.iconDisabled]}>{icon}</View>}
          <View style={styles.rowTextContainer}>
            <Text style={[styles.rowLabel, disabled && styles.rowLabelDisabled]}>{label}</Text>
            {description && <Text style={styles.rowDescription}>{description}</Text>}
          </View>
        </View>
        <View style={styles.rowRight}>{children}</View>
      </View>
    );

    return onPress && !disabled ? (
      <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={[styles.rowWrapper, disabled && styles.rowWrapperDisabled]}>
        {Content}
      </TouchableOpacity>
    ) : (
      <View style={[styles.rowWrapper, disabled && styles.rowWrapperDisabled]}>{Content}</View>
    );
  }

  function ChevronRight() {
    return (
      <View style={styles.chevron}>
        <View style={styles.chevronBar} />
        <View style={[styles.chevronBar, styles.chevronBarBottom]} />
      </View>
    );
  }

  const EmojiIcon = ({ emoji, bg }: any) => (
    <View style={[styles.simpleIcon, { backgroundColor: bg }]}><Text style={styles.simpleEmoji}>{emoji}</Text></View>
  );

  // ======================= RENDER =======================

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cài đặt</Text>
        <Text style={styles.headerSubtitle}>Quản lý tài khoản và ứng dụng</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <SettingsSectionHeader label="Tổng quan" />

        <SettingsRow icon={<EmojiIcon emoji="🔔" bg="#FFF4E5" />} label="Thông báo" description="Nhận thông báo về sức khỏe và nhắc nhở">
          <Switch
            trackColor={{ false: '#E5E7EB', true: '#10B981' }}
            thumbColor={notificationsEnabled ? '#FFFFFF' : '#9CA3AF'}
            onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
            value={notificationsEnabled}
          />
        </SettingsRow>

        <SettingsRow icon={<EmojiIcon emoji="🌐" bg="#E6F4FF" />} label="Ngôn ngữ" description="Tiếng Việt" onPress={handleLanguagePress}>
          <ChevronRight />
        </SettingsRow>

        <SettingsRow icon={<EmojiIcon emoji="📤" bg="#E8F5E9" />} label="Xuất dữ liệu" description="Tải xuống dữ liệu sức khỏe của bạn" onPress={handleExportData}>
          <ChevronRight />
        </SettingsRow>

        <SettingsSectionHeader label="Tài khoản" />

        <SettingsRow icon={<EmojiIcon emoji="🚪" bg="#FDEDED" />} label="Đăng xuất" onPress={handleLogout}>
          <ChevronRight />
        </SettingsRow>
      </ScrollView>
    </View>
  );
}

// ======================= STYLE ĐỂ NGUYÊN =======================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },

  header: {
    height: 120,
    backgroundColor: '#2EAF7D',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: '#2EAF7D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },

  headerSubtitle: {
    color: '#E8F5E8',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.9,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  sectionHeaderContainer: {
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 4,
  },

  sectionHeaderText: {
    color: '#64748B',
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  rowWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },

  rowWrapperDisabled: {
    opacity: 0.6,
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 64,
  },

  rowDisabled: {
    opacity: 0.5,
  },

  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },

  rowTextContainer: {
    flex: 1,
  },

  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  rowLabel: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
    marginBottom: 2,
  },

  rowLabelDisabled: {
    color: '#94A3B8',
  },

  rowDescription: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '400',
    lineHeight: 18,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  iconDisabled: {
    opacity: 0.5,
  },

  chevron: {
    width: 16,
    height: 16,
    transform: [{ rotate: '-45deg' }],
  },

  chevronBar: {
    position: 'absolute',
    width: 10,
    height: 2,
    backgroundColor: '#94A3B8',
    top: 6,
    left: 3,
    borderRadius: 1,
  },

  chevronBarBottom: {
    transform: [{ rotate: '90deg' }],
  },

  simpleIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  simpleEmoji: {
    fontSize: 20,
  },
});
