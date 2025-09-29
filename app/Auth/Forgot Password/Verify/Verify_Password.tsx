import { Text } from 'react-native';
import {Stack} from 'expo-router';

export default function VerifyScreen() {
  return (
    <>
    <Stack.Screen options={{ title: 'Xác thực tài khoản' }} />
    <Text>Nhập mã xác thực</Text>
    </>
  );
}