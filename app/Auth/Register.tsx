import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    cameraAddress: '',
    braceletAddress: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = () => {
    router.push('../Auth/VerifyRegister');
  };

  const handleLogin = () => {
    router.push('../Auth/Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Đăng ký tài khoản' }} />
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>H</Text>
            </View>
            <View style={styles.appInfo}>
              <Text style={styles.appName}>HealthApp</Text>
              <Text style={styles.appSlogan}>Chăm sóc sức khỏe</Text>
            </View>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Đăng ký</Text>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Họ và tên"
              value={formData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={18}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              placeholderTextColor="#999"
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={18}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Địa chỉ vật lí thiết bị Camera"
              value={formData.cameraAddress}
              placeholderTextColor="#999"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Địa chỉ vật lí thiết bị Vòng tay"
              value={formData.braceletAddress}
              placeholderTextColor="#999"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Đăng ký</Text>
          </TouchableOpacity>

          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>Đã có tài khoản? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginLink}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingVertical: 15, alignItems: 'center' },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 45, height: 45, borderRadius: 22, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  logoText: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  appName: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50' },
  appSlogan: { fontSize: 12, color: '#666' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 15, marginBottom: 20 },
  form: { paddingHorizontal: 20 },
  inputContainer: { position: 'relative', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, fontSize: 14, backgroundColor: '#fff' },
  eyeIcon: { position: 'absolute', right: 12, top: 12 },
  registerButton: { backgroundColor: '#4CAF50', borderRadius: 10, paddingVertical: 14, marginTop: 5, marginBottom: 15 },
  registerButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  loginLinkContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  loginText: { fontSize: 14, color: '#999' },
  loginLink: { fontSize: 14, color: '#4CAF50', fontWeight: 'bold' },
  appInfo: { alignItems: 'flex-start', },
});
