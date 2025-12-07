import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoSurface from './VideoSurface';
import { Stack } from 'expo-router';
import { BASE_URL } from '@/config';

const { height, width } = Dimensions.get('window');

const STREAM_URL = `${BASE_URL}/hls/cam1/index.m3u8`;
const DEMO_HLS = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

export default function CameraHome() {
  const router = useRouter();

  const [streamUrl, setStreamUrl] = useState<string>(STREAM_URL);
  const [isReady, setIsReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // animated scale cho fullscreen
  const fullscreenScale = useRef(new Animated.Value(0.9)).current;

  const connected = useMemo(() => !!streamUrl, [streamUrl]);

  const now = new Date();
  const formatted = now.toLocaleString();

  const handleUseDemo = () => {
    setIsReady(false);
    setStreamUrl(DEMO_HLS);
    Alert.alert('Đã dùng link demo', 'Bạn đang xem stream demo HLS.');
  };

  const handleReconnect = () => {
    setIsReady(false);
    setStreamUrl((prev) => prev); // chỗ này sau có thể refresh token / URL
  };

  const handleError = (e: unknown) => {
    console.log('Video error: ', e);
    Alert.alert('Lỗi phát video', 'Không phát được stream. Kiểm tra lại link HLS.');
  };

  const openFullscreen = () => {
    if (!connected || !isReady) return;
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    Animated.timing(fullscreenScale, {
      toValue: 0.9,
      duration: 160,
      useNativeDriver: true,
    }).start(() => {
      setIsFullscreen(false);
    });
  };

  // Khi isFullscreen = true thì chạy animation zoom-in
  useEffect(() => {
    if (isFullscreen) {
      fullscreenScale.setValue(0.9);
      Animated.timing(fullscreenScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isFullscreen, fullscreenScale]);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#fff' },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ paddingHorizontal: 8 }}>
              <Ionicons name="arrow-back" size={22} color="#000" />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>Camera</Text>
              <Text style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                {connected ? 'Live' : 'Chưa kết nối'}
              </Text>
            </View>
          ),
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
        {/* VIDEO CARD */}
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
                  useNativeControls={false}
                />

                {/* Loading overlay (mẫu 1) */}
                {!isReady && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={styles.loadingText}>Đang kết nối tới camera…</Text>
                  </View>
                )}

                {/* LIVE badge + timestamp */}
                <View style={styles.liveRow}>
                  <View style={styles.liveBadge}>
                    <Ionicons name="radio" size={12} color="#fff" />
                    <Text style={styles.liveText}>LIVE</Text>
                  </View>
                  <View style={styles.timeStampBox}>
                    <Text style={styles.timeStampText}>{formatted}</Text>
                  </View>
                </View>

                {/* Video Controls (overlay góc phải) */}
                <View style={styles.videoControls}>
                  <TouchableOpacity style={styles.controlButton}>
                    <Ionicons name="volume-high-outline" size={20} color="#fff" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.controlButton}>
                    <Ionicons name="videocam-outline" size={20} color="#fff" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.controlButton}>
                    <Ionicons name="camera-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.placeholderWrap}>
                <View style={styles.placeholderOverlay} />
                <View style={styles.placeholderContent}>
                  <Ionicons name="videocam-off-outline" size={42} color="#fff" />
                  <Text style={styles.placeholderTitle}>Chưa kết nối camera</Text>
                  <Text style={styles.placeholderSub}>
                    Nhấn “Demo” để thử video mẫu hoặc cấu hình link HLS trong phần cài đặt.
                  </Text>
                  <TouchableOpacity style={styles.primaryBtn} onPress={handleUseDemo}>
                    <Text style={styles.primaryBtnText}>Dùng Video Demo</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/* Info Row */}
          <View style={styles.statsRow}>
            <Text style={styles.statItem}>
              {connected ? (isReady ? 'Đang phát' : 'Đang tải…') : 'Chưa kết nối'}
            </Text>
            <View style={styles.statsRight}>
              {connected && <View style={styles.statDot} />}
              {connected && <Text style={styles.statItem}>HLS</Text>}
            </View>
          </View>
        </View>

        {/* QUICK ACTION BUTTONS */}
        <View style={styles.controlButtons}>
          <TouchableOpacity style={styles.controlBtn}>
            <Ionicons name="cloud" size={20} color="#000" />
            <Text style={styles.controlBtnText}>Cloud</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlBtn}>
            <Ionicons name="card" size={20} color="#000" />
            <Text style={styles.controlBtnText}>Xem lại</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlBtn}>
            <Ionicons name="notifications-off" size={20} color="#000" />
            <Text style={styles.controlBtnText}>Báo động</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlBtn}>
            <Ionicons name="layers" size={20} color="#000" />
            <Text style={styles.controlBtnText}>Nhiều kênh</Text>
          </TouchableOpacity>
        </View>

        {/* BOTTOM ACTION */}
        <View style={styles.bottomActionButtons}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="grid" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtnSecondary} onPress={handleReconnect}>
            <Ionicons name="refresh" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* HISTORY THUMBNAILS */}
        <View style={styles.thumbnailsSection}>
          <Text style={styles.thumbnailsTitle}>Lịch sử gần đây · {formatted}</Text>

          <View style={styles.thumbnailsGrid}>
            {['16:42', '16:39', '16:32', '16:29', '16:25', '16:20'].map((time, index) => (
              <TouchableOpacity key={index} style={styles.thumbnailItem}>
                <View style={styles.thumbnail}>
                  <Ionicons name="play" size={16} color="#fff" style={styles.thumbnailPlayIcon} />
                  <Text style={styles.thumbnailTime}>{time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* FOOTER NAVIGATION */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={handleUseDemo}>
          <Ionicons name="play-circle-outline" size={24} color="#666" />
          <Text style={styles.navButtonText}>Demo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={handleReconnect}>
          <Ionicons name="refresh-outline" size={24} color="#666" />
          <Text style={styles.navButtonText}>Kết nối</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            (!connected || !isReady) && { opacity: 0.4 },
          ]}
          onPress={openFullscreen}
          disabled={!connected || !isReady}
        >
          <Ionicons name="expand-outline" size={24} color="#666" />
          <Text style={styles.navButtonText}>Fullscreen</Text>
        </TouchableOpacity>
      </View>

      {/* FULLSCREEN MODAL (Zoom-in) */}
      <Modal
        visible={isFullscreen}
        onRequestClose={closeFullscreen}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.fullscreenContainer}>
          <Animated.View style={[styles.fullscreenVideoBox, { transform: [{ scale: fullscreenScale }] }]}>
            <VideoSurface
              uri={streamUrl}
              onReady={() => {}}
              onError={handleError}
              style={styles.fullscreenVideo}
              autoPlay
              loop
              useNativeControls
            />

            {/* Close button */}
            <TouchableOpacity style={styles.fullscreenClose} onPress={closeFullscreen}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flex: 1 },
  scrollContent: { padding: 12, paddingBottom: 24 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    marginBottom: 18,
  },

  videoWrap: {
    height: height * 0.38,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#101317',
  },

  video: { width: '100%', height: '100%' },

  // Loading overlay
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  // LIVE badge + time
  liveRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  liveBadge: {
    backgroundColor: 'rgba(231, 63, 63, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  liveText: { color: '#fff', fontSize: 11, fontWeight: '700' },

  timeStampBox: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  timeStampText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  // Video controls
  videoControls: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    gap: 10,
  },

  controlButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Placeholder
  placeholderWrap: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0c0f14',
    alignItems: 'center',
    justifyContent: 'center',
  },

  placeholderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  placeholderContent: {
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  placeholderTitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 12,
    fontWeight: '700',
  },

  placeholderSub: {
    marginTop: 8,
    color: '#ddd',
    fontSize: 13,
    textAlign: 'center',
  },

  primaryBtn: {
    marginTop: 16,
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    minWidth: '60%',
  },

  primaryBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  // Status row
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  statItem: { fontSize: 12, color: '#333' },

  statsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  statDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#31C48D',
  },

  // Top control buttons
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingVertical: 8,
    backgroundColor: '#fff',
    marginBottom: 14,
  },

  controlBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  controlBtnText: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '600',
  },

  // Bottom action
  bottomActionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
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
  },

  actionBtnSecondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },

  // Thumbnails
  thumbnailsSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 14,
  },

  thumbnailsTitle: {
    fontSize: 16,
    fontWeight: '700',
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
    borderRadius: 10,
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
    fontWeight: '700',
  },

  // Bottom nav
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-around',
  },

  navButton: {
    alignItems: 'center',
    minWidth: 60,
  },

  navButtonText: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },

  // Fullscreen modal
  fullscreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullscreenVideoBox: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullscreenVideo: {
    width: '100%',
    height: '100%',
  },

  fullscreenClose: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
