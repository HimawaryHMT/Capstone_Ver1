import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function TabTwoScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Sau khi đăng nhập thành công, chuyển sang trang tab
    router.replace('../Auth/Login');
  };
  return (
    <View style={styles.container}>
   <Text style={styles.title}>Đây là trang Setting</Text>

         <Text style={{ fontSize: 24, marginBottom: 20 }}>Đăng xuất</Text>
         {/* Thêm form đăng nhập ở đây nếu muốn */}
         <Button title="Đăng xuất" onPress={handleLogin} />
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
