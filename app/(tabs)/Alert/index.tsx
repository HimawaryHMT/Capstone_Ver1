import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ==================== INTERFACES ====================
interface LatestAlertCardProps {
  onContactMedicalSupport?: () => void;
}

interface AlertHistoryData {
  id: string;
  type: "fall" | "abnormal";
  title: string;
  time: string;
  status: string;
}

// ==================== COMPONENT: LatestAlertCard ====================
const LatestAlertCard: React.FC<LatestAlertCardProps> = ({
  onContactMedicalSupport,
}) => {
  return (
    <View style={alertCardStyles.container}>
      {/* Video preview */}
      <View style={alertCardStyles.videoContainer}>
        <Image
          source={{
            uri: "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Fall+Alert+Preview",
          }}
          style={alertCardStyles.videoImage}
          resizeMode="cover"
        />
        <View style={alertCardStyles.playButton}>
          <Ionicons name="play" size={36} color="rgba(255,255,255,0.9)" />
        </View>

        <View style={alertCardStyles.incidentTag}>
          <Ionicons name="warning" size={16} color="#fff" />
          <Text style={alertCardStyles.incidentTagText}>Sự cố té ngã</Text>
        </View>
      </View>

      {/* Info */}
      <View style={alertCardStyles.info}>
        <View style={alertCardStyles.infoRow}>
          <Ionicons name="time" size={16} color="#666" />
          <Text style={alertCardStyles.infoText}>
            09:30 SA, 15 tháng 10, 2024
          </Text>
        </View>
        <View style={alertCardStyles.infoRow}>
          <Ionicons name="location" size={16} color="#666" />
          <Text style={alertCardStyles.infoText}>
            Phát hiện té ngã tại phòng khách
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={alertCardStyles.actionsRow}>
        <TouchableOpacity
          style={[alertCardStyles.actionBtn, { backgroundColor: "#3ad840ff" }]}
          onPress={onContactMedicalSupport}
        >
          <Ionicons name="call" size={18} color="#fff" />
          <Text style={alertCardStyles.actionText}>Liên hệ hỗ trợ y tế</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[alertCardStyles.actionBtn, { backgroundColor: "#ffe66d" }]}
        >
          <Ionicons name="help-buoy" size={18} color="#111" />
          <Text style={[alertCardStyles.actionText, { color: "#111" }]}>
            Hướng dẫn sơ cứu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const alertCardStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    overflow: "hidden",
  },
  videoContainer: {
    position: "relative",
    height: 220,
    backgroundColor: "#f8f8f8",
  },
  videoImage: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.8)",
  },
  incidentTag: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "#e63946",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  incidentTagText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 4,
  },
  info: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#444",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 6,
  },
});

// ==================== COMPONENT: AlertHistoryItem ====================
const AlertHistoryItem = ({
  type,
  title,
  time,
  status,
}: AlertHistoryData) => {
  const color = type === "fall" ? "#e63946" : "#4361ee";

  return (
    <View style={[historyItemStyles.container, { borderLeftColor: color }]}>
      <View style={[historyItemStyles.iconCircle, { backgroundColor: color }]}>
        <Ionicons
          name={type === "fall" ? "warning" : "pulse"}
          size={20}
          color="#fff"
        />
      </View>
      <View style={historyItemStyles.content}>
        <Text style={historyItemStyles.title}>{title}</Text>
        <Text style={historyItemStyles.time}>{time}</Text>
        <Text style={[historyItemStyles.status, { color }]}>
          {status.toUpperCase()}
        </Text>
      </View>
    </View>
  );
};

const historyItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: "700", color: "#333" },
  time: { fontSize: 13, color: "#666", marginVertical: 2 },
  status: { fontSize: 12, fontWeight: "700" },
});

// ==================== MAIN SCREEN ====================
export default function FallAlertScreen() {
  const handleContactMedicalSupport = () =>
    console.log("Contacting medical support...");

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']} >
      

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Cảnh báo mới nhất</Text>
        <LatestAlertCard onContactMedicalSupport={handleContactMedicalSupport} />

        <Text style={styles.sectionTitle}>Lịch sử cảnh báo</Text>
        <AlertHistoryItem
          id="1"
          type="fall"
          title="Sự cố té ngã"
          time="09:30 SA, 14 tháng 10, 2024"
          status="Đã xử lý"
        />
        <AlertHistoryItem
          id="2"
          type="abnormal"
          title="Tình trạng bất thường"
          time="07:15 SA, 12 tháng 10, 2024"
          status="Đã xử lý"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// ==================== STYLES ====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
});
