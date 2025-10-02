import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../../assets/styles/style';
import React, { useState, useEffect } from 'react';


export function ComponentDevice() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // cập nhật mỗi giây

    return () => clearInterval(timer); // cleanup khi component unmount
  }, []);

  return (
    <View style={styles.deviceCard}>
      {/* Device Header */}
      <View style={styles.deviceHeader}>
        <View>
          <Text style={styles.deviceTitle}>Camera</Text>
          <Text style={styles.deviceDate}>{currentDate.toLocaleString()}</Text>
        </View>
        <Ionicons name="ellipsis-vertical" size={18} color="#666" />
      </View>

      {/* Device Image / Status */}
      <View style={styles.deviceImageContainer}>
        {/* Offline Badge */}
        <View style={styles.offlineBadgeRow}>
          <View style={styles.offlineBadge}>
            <Ionicons name="warning" size={14} color="#fff" />
            <Text style={styles.offlineBadgeText}>Thiết bị đang ngoại tuyến</Text>
          </View>
        </View>

        {/* Expired Badge */}
        <View style={styles.expiredBadge}>
          <View style={styles.dot} />
          <Text style={styles.expiredText}>Đã hết hạn</Text>
        </View>

        {/* Help Button */}
        <View style={styles.deviceActions}>
          <TouchableOpacity style={styles.helpButton}>
            <Ionicons name="help-circle" size={16} color="#333" />
            <Text style={styles.helpButtonText}>Xem trợ giúp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}