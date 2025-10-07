import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // Gửi yêu cầu đăng nhập đến server
    try {
      const res = await fetch('http://192.168.100.5:5060/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // Đăng nhập thành công, chuyển hướng đến trang chính
        router.push("/(tabs)/HomePage");
        console.log("Đăng nhập thành công");
      } else {
        // Đăng nhập thất bại, hiển thị thông báo lỗi
        Alert.alert("Đăng nhập thất bại", data.message || "Vui lòng kiểm tra lại thông tin đăng nhập.");
      }

    } catch (error) {
      Alert.alert("Lỗi mạng", "Không thể kết nối đến server. Vui lòng thử lại sau.");
      console.error("Lỗi đăng nhập:", error);
    }

  };

  /* =================================== */

  // const handleLogin = () => {
  //   if (email === "thang@gmail.com" && password === "123") {
  //     router.push("/(tabs)/HomePage"); // Đường dẫn Home (sửa thành route bạn đang dùng)
  //   } else {
  //     Alert.alert("Sai thông tin!", "Email hoặc mật khẩu không đúng");
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.circle}>
          <Text style={styles.logoText}>H</Text>
        </View>
        <Text style={styles.appName}>HealthApp</Text>
        <Text style={styles.tagline}>Chăm sóc sức khỏe</Text>
      </View>

      {/* Tiêu đề */}
      <Text style={styles.title}>Đăng nhập</Text>

      {/* Ô nhập Email */}
      <TextInput
        style={styles.input}
        placeholder="Email/Số điện thoại"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
      />

      {/* Ô nhập Mật khẩu + icon */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mật khẩu"
          placeholderTextColor="#666"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}

        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <AntDesign name={showPassword ? "eye" : "eye-invisible"} size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Nút đăng nhập */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Quên mật khẩu */}
      <TouchableOpacity onPress={() => router.push('../Auth/Forgot Password')}>
        <Text style={styles.forgotText}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      {/* Đăng ký */}
      {/* <Text style={styles.signupText}>
        Chưa có tài khoản? <Text style={styles.signupLink}>Đăng ký</Text>
      </Text> */}

      {/* Thêm khoảng cách ở dưới cùng */}
      <TouchableOpacity onPress={() => router.push("../Auth/Register")}>
        <Text style={styles.signupText}>Chưa có tài khoản?
          <Text style={styles.forgotText}> Đăng ký</Text>
        </ Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",   // Thêm dòng này
    paddingHorizontal: 30,
    paddingTop: 60
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: -60
  },
  circle: {
    backgroundColor: "#4CAF50",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  logoText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold"
  },
  appName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4CAF50"
  },
  tagline: {
    fontSize: 14,
    color: "#666"
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",

    borderRadius: 8,
    padding: 14,
    marginBottom: 15
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: "#999"
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  forgotText: {
    color: "#4CAF50",
    marginBottom: 30,
    fontWeight: "500"
  },
  signupText: {
    color: "#999"
  },
  signupLink: {
    color: "#4CAF50",
    fontWeight: "600"
  }
});