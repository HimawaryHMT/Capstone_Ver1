import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoSurface from './VideoSurface';
import { Stack } from "expo-router";


const { height } = Dimensions.get('window');

/**
 * 1) Đổi STREAM_URL = link HLS thật (m3u8) của camera nhà bạn.
 *    Ví dụ: 'https://your-domain.com/live/camera01/index.m3u8'
 * 2) Nếu để '' (rỗng) => xem như CHƯA KẾT NỐI, sẽ hiện ảnh minh hoạ.
 */
const STREAM_URL = ''; // <-- Thay vào đây link HLS thật khi có

// Link demo (để bạn test ngay)
const DEMO_HLS = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

export default function CameraHome() {
  const router = useRouter();
  const [streamUrl, setStreamUrl] = useState<string>(STREAM_URL);
  const [isReady, setIsReady] = useState(false);

  const connected = useMemo(() => !!streamUrl, [streamUrl]);

  const headerTitle = connected ? 'Camera Nhà (Live)' : 'Camera Nhà (Chưa kết nối)';

  const handleUseDemo = () => {
    setIsReady(false);
    setStreamUrl(DEMO_HLS);
    Alert.alert('Đã dùng link demo', 'Bạn đang xem stream demo HLS.');
  };

  const handleGuide = () => {
    Alert.alert(
      'Hướng dẫn kết nối',
      'Kéo xuống dưới để xem các bước kết nối camera nhà với ứng dụng.'
    );
  };

  const handleReconnect = () => {
    setIsReady(false);
    setStreamUrl((prev) => prev); // bạn có thể refresh token/URL ở đây
  };

  const handleError = (e: unknown) => {
    console.log('Video error: ', e);
    Alert.alert('Lỗi phát video', 'Không phát được stream. Kiểm tra lại link HLS.');
  };



  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#fff' },
          headerShadowVisible: false,
          // Header trái: Back
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ paddingHorizontal: 8 }}>
              <Ionicons name="arrow-back" size={22} color="#000" />
            </TouchableOpacity>
          ),
          // Header giữa: tiêu đề 2 dòng
          headerTitle: () => (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>Camera</Text>
              <Text style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                {connected ? 'Live' : 'Chưa kết nối'}
              </Text>
            </View>
          ),
          // Header phải: Settings
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/(modals)/ScreenCamera/settingCamera')}
              style={{ paddingHorizontal: 8 }}
            >
              <Ionicons name="settings-outline" size={22} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>

        {/* Video Card */}
        <View style={styles.card}>
          <View style={styles.videoWrap}>
            {connected ? (
              <>
                <VideoSurface
                  uri={streamUrl}
                  onReady={() => setIsReady(true)}
                  onError={handleError}
                  style={styles.video}
                  autoPlay
                  loop
                  useNativeControls
                />
                {/* Overlays */}
                <View style={styles.overlayTopLeft}>
                  <Text style={styles.timestamp}>2025-10-13 16:45:04</Text>
                </View>

                <View style={styles.overlayTopRight}>
                  <View style={styles.badgeLive}>
                    <Ionicons name="radio" size={12} color="#fff" />
                    <Text style={styles.badgeText}>LIVE</Text>
                  </View>
                </View>

                {/* Video Controls */}
                <View style={styles.videoControls}>
                  <TouchableOpacity style={styles.controlButton} onPress={() => {/* Mute/Unmute */ }}>
                    <Ionicons name="volume-high-outline" size={20} color="#fff" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.controlButton} onPress={() => {/* Record */ }}>
                    <Ionicons name="videocam-outline" size={20} color="#fff" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.controlButton} onPress={() => {/* Screenshot */ }}>
                    <Ionicons name="camera-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              // Chưa kết nối: ảnh minh hoạ + CTA
              <View style={styles.placeholderWrap}>
                <Image
                  //  source={require('@/assets/images/icon')} // đặt 1 ảnh minh hoạ vào assets
                  style={styles.placeholderImg}
                  resizeMode="cover"
                />
                <View style={styles.placeholderOverlay} />
                <View style={styles.placeholderContent}>
                  <View style={styles.placeholderCenter}>
                    <Ionicons name="videocam" size={36} color="#fff" />
                    <Text style={styles.placeholderTitle}>Chưa kết nối camera</Text>
                    <Text style={styles.placeholderSub}>
                      Thêm link stream HLS để xem trực tiếp camera ở nhà.
                    </Text>
                  </View>
                  <View style={styles.placeholderActions}>
                    <TouchableOpacity style={styles.primaryBtn} onPress={handleGuide}>
                      <Text style={styles.primaryBtnText}>Hướng dẫn kết nối</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryBtn} onPress={handleUseDemo}>
                      <Text style={styles.secondaryBtnText}>Dùng link demo</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* Info Row */}
          <View style={styles.statsRow}>
            <Text style={styles.statItem}>
              Trạng thái: {connected ? (isReady ? 'Đang phát' : 'Đang tải…') : 'Chưa kết nối'}
            </Text>
            {connected && <View style={styles.statDot} />}
            {connected && <Text style={styles.statItem}>HLS</Text>}
          </View>
        </View>

        {/* Control Buttons */}
        <View style={styles.controlButtons}>
          <TouchableOpacity style={styles.controlBtn} onPress={() => Alert.alert('Cloud Service', 'Dịch vụ đám mây đã hết hạn')}>
            <View style={styles.controlBtnIcon}>
              <Ionicons name="cloud" size={20} color="#000" />
              <View style={styles.expiredBadge}>
                <Text style={styles.expiredText}>Đã hết..</Text>
              </View>
            </View>
            <Text style={styles.controlBtnText}>Dịch vụ đám mây</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlBtn} onPress={() => Alert.alert('Xem lại', 'Mở danh sách video đã ghi')}>
            <View style={styles.controlBtnIcon}>
              <Ionicons name="card" size={20} color="#000" />
            </View>
            <Text style={styles.controlBtnText}>Xem lại</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlBtn} onPress={() => Alert.alert('Thông báo', 'Tắt thông báo báo động')}>
            <View style={styles.controlBtnIcon}>
              <Ionicons name="notifications-off" size={20} color="#000" />
            </View>
            <Text style={styles.controlBtnText}>Thông báo báo động</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlBtn} onPress={() => Alert.alert('Multi-channel', 'Mở màn hình nhiều kênh')}>
            <View style={styles.controlBtnIcon}>
              <Ionicons name="layers" size={20} color="#000" />
            </View>
            <Text style={styles.controlBtnText}>Màn hình nhiều kênh</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Action Buttons */}
        <View style={styles.bottomActionButtons}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => Alert.alert('Grid View', 'Mở chế độ lưới')}>
            <Ionicons name="grid" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtnSecondary} onPress={() => Alert.alert('Refresh', 'Làm mới dữ liệu')}>
            <Ionicons name="refresh" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Video Thumbnails Section */}
        <View style={styles.thumbnailsSection}>
          <Text style={styles.thumbnailsTitle}>2025-10-13 16:00</Text>
          <View style={styles.thumbnailsGrid}>
            {['16:42', '16:39', '16:32', '16:29', '16:25', '16:20'].map((time, index) => (
              <TouchableOpacity key={index} style={styles.thumbnailItem} onPress={() => Alert.alert('Video', `Xem video lúc ${time}`)}>
                <View style={styles.thumbnail}>
                  <Ionicons name="play" size={16} color="#fff" style={styles.thumbnailPlayIcon} />
                  <Text style={styles.thumbnailTime}>{time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Hướng dẫn kết nối - Moved to bottom */}
        <View style={styles.guideCard}>
          <Text style={styles.guideTitle}>Hướng dẫn kết nối camera nhà</Text>
          <Text style={styles.guideStep}>
            1) Lấy **đường dẫn RTSP** của camera (ví dụ từ IP camera/NVR: dạng <Text style={styles.code}>rtsp://user:pass@ip:554/...</Text>).
          </Text>
          <Text style={styles.guideStep}>
            2) **Chuyển RTSP → HLS** (m3u8) bằng một trong các cách:
          </Text>
          <Text style={styles.guideBullet}>• Dùng <Text style={styles.bold}>FFmpeg</Text> trên server/NAS:</Text>
          <Text style={styles.codeBlock}>
            {`ffmpeg -rtsp_transport tcp -i "rtsp://user:pass@IP:554/stream1" \\
  -fflags nobuffer -flags +low_delay -preset veryfast -tune zerolatency \\
  -codec:v libx264 -codec:a aac -f hls -hls_time 2 -hls_list_size 6 -hls_flags delete_segments \\
  /var/www/html/live/camera01/index.m3u8`}
          </Text>
          <Text style={styles.guideBullet}>• Dùng <Text style={styles.bold}>SRS/rtsp-simple-server</Text> + <Text style={styles.bold}>FFmpeg</Text> để publish thành HLS.</Text>
          <Text style={styles.guideStep}>
            3) **Host** thư mục HLS (m3u8 + .ts/.m4s) trên web server (Nginx/Apache/S3+CDN). Đảm bảo đường dẫn công khai:{" "}
            <Text style={styles.code}>https://your-domain/live/camera01/index.m3u8</Text>
          </Text>
          <Text style={styles.guideStep}>
            4) Mở file <Text style={styles.code}>CameraHome.tsx</Text> và thay biến <Text style={styles.code}>STREAM_URL</Text> thành link HLS thật.
          </Text>
          <Text style={styles.guideStep}>
            5) Nếu mạng nội bộ/NAT: cấu hình **port forwarding** hoặc dùng **reverse proxy**/**tunnel** (Cloudflare Tunnel, Tailscale…) để app truy cập từ ngoài.
          </Text>
          <Text style={styles.guideStep}>
            6) Bảo mật: dùng **HTTPS**, **token/tạm thời** cho HLS (signed URL), giới hạn IP nếu cần.
          </Text>
          <Text style={styles.guideStep}>
            7) Test: chạy trên thiết bị thật. Cài:<Text style={styles.codeInline}> expo-av</Text> (đã dùng).
          </Text>
          <Text style={styles.guideStepSmall}>
            Lưu ý: RTSP **không phát trực tiếp** trong app — bạn cần chuyển sang **HLS**/**DASH**/**WebRTC gateway**. HLS là cách ổn định nhất trên iOS/Android.
          </Text>
        </View>

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={handleGuide}>
          <Ionicons name="help-circle-outline" size={24} color="#666" />
          <Text style={styles.navButtonText}>Hướng dẫn</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={handleUseDemo}>
          <Ionicons name="play-circle-outline" size={24} color="#666" />
          <Text style={styles.navButtonText}>Demo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={handleReconnect}>
          <Ionicons name="refresh-outline" size={24} color="#666" />
          <Text style={styles.navButtonText}>Kết nối</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => {/* Fullscreen */ }}>
          <Ionicons name="expand-outline" size={24} color="#666" />
          <Text style={styles.navButtonText}>Toàn màn hình</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => {/* Quick action */ }}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // layout
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 56, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  headerBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700' },
  headerSub: { fontSize: 12, color: '#666', marginTop: 2 },

  scroll: { flex: 1 },
  scrollContent: { padding: 12, paddingBottom: 24 },

  // video card
  card: {
    backgroundColor: '#fff', borderRadius: 14, padding: 10,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
    elevation: 3, marginBottom: 12, borderWidth: 1, borderColor: '#f2f2f2',
  },
  videoWrap: { height: height * 0.40, borderRadius: 12, overflow: 'hidden', backgroundColor: '#101317' },
  video: { width: '100%', height: '100%' },

  // placeholder
  placeholderWrap: { flex: 1, width: '100%', height: '100%' },
  placeholderImg: { width: '100%', height: '100%' },
  placeholderOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.30)' },
  placeholderContent: {
    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
    alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20,
    paddingVertical: 20,
  },
  placeholderCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  placeholderTitle: { color: '#fff', fontSize: 18, fontWeight: '800', marginTop: 8 },
  placeholderSub: { color: '#fff', fontSize: 13, textAlign: 'center', opacity: 0.9, marginTop: 6 },
  placeholderActions: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    width: '100%',
  },
  primaryBtn: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 4,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
    textAlign: 'center',
  },
  secondaryBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  secondaryBtnText: {
    color: '#111',
    fontWeight: '700',
    fontSize: 12,
    textAlign: 'center',
  },

  // overlays
  overlayTopLeft: { position: 'absolute', top: 10, left: 10 },
  overlayTopRight: { position: 'absolute', top: 10, right: 10 },
  timestamp: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeLive: {
    backgroundColor: '#E73F3F', paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 999, flexDirection: 'row', alignItems: 'center', gap: 6,
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },

  // info row
  statsRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 10,
  },
  statItem: { fontSize: 12, color: '#333' },
  statDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#31C48D' },

  // guide card
  guideCard: {
    backgroundColor: '#fafafa', borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: '#eee',
  },
  guideTitle: { fontSize: 15, fontWeight: '800', marginBottom: 8 },
  guideStep: { fontSize: 13, color: '#333', marginBottom: 6, lineHeight: 20 },
  guideStepSmall: { fontSize: 12, color: '#555', marginTop: 4 },
  guideBullet: { fontSize: 13, color: '#333', marginLeft: 8, marginBottom: 4 },
  bold: { fontWeight: '700' },
  codeInline: { fontFamily: 'monospace' },
  code: { fontFamily: 'monospace', backgroundColor: '#f1f3f5', paddingHorizontal: 6, borderRadius: 6 },
  codeBlock: {
    fontFamily: 'monospace', backgroundColor: '#0b1020', color: '#E6E8EF',
    padding: 10, borderRadius: 10, marginVertical: 6, lineHeight: 18,
  },

  // Video controls
  videoControls: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    gap: 8,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Bottom navigation
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-around',
  },
  navButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 60,
  },
  navButtonText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },

  // Floating Action Button
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  // Control Buttons
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  controlBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginHorizontal: 2,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  controlBtnIcon: {
    position: 'relative',
    marginBottom: 4,
  },
  expiredBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: 'center',
  },
  expiredText: {
    color: '#fff',
    fontSize: 7,
    fontWeight: '600',
  },
  controlBtnText: {
    fontSize: 9,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    lineHeight: 11,
  },

  // Bottom Action Buttons
  bottomActionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    alignItems: 'center',
  },
  actionBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionBtnSecondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  // Video Thumbnails
  thumbnailsSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  thumbnailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  thumbnailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  thumbnailItem: {
    width: '30%',
    marginBottom: 12,
  },
  thumbnail: {
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  thumbnailPlayIcon: {
    position: 'absolute',
    bottom: 4,
    left: 4,
  },
  thumbnailTime: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
});