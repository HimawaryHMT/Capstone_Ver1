import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  // Giả sử bạn có một trạng thái để kiểm tra cảnh báo

  // Ở trạng thái bình thường thì là màu xanh 
  // Khi có cảnh báo thì chuyển sang màu đỏ
  const hasAlert = true; // Thay đổi giá trị này để kiểm tra

  return (
    <Tabs
      screenOptions={{

        tabBarStyle: {
          height: 80, // ⬆️ Chiều cao thanh navbar (mặc định khoảng 55)
          paddingBottom: 10, // tạo khoảng cách giữa icon & cạnh dưới
          paddingTop: 10, // icon cách mép trên
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
          backgroundColor: '#fff', // màu nền
        },
        tabBarItemStyle: {
          justifyContent: 'center', // căn giữa icon + text theo trục dọc
          alignItems: 'center',
          paddingBottom: 5, // nếu icon vẫn hơi thấp, tăng giảm tuỳ ý
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
          marginTop: 0, // loại bỏ khoảng cách mặc định
        },
      }}
    >
      <Tabs.Screen
        // Trỏ dến file app/(tabs)/HomePage/index.tsx
        name="HomePage/index"
        options={{

          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        // Trỏ dến file app/(tabs)/Monitoring/index.tsx
        name="Monitoring/index"
        options={{
          title: 'Theo dõi',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Alert/index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: hasAlert ? '#FF3B30' : '#4CAF50', // đỏ khi cảnh báo, xanh khi OK
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 30, // 🔥 đẩy nút nổi lên giữa navbar
                shadowColor: hasAlert ? '#FF3B30' : '#4CAF50', // bónng
                shadowOpacity: 0.8,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 12, // bóng nổi (Android)
                borderWidth: 3,
                borderColor: '#fff', // viền trắng giúp nổi bật trên nền navbar
              }}>
              <MaterialCommunityIcons
                name={hasAlert ? 'car-brake-alert' : 'check-circle-outline'} // đổi icon khi có cảnh báo
                size={38}
                color="#fff"
                style={{
                  textShadowColor: 'rgba(255,255,255,0.7)',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 6,
                }}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        // Trỏ dến file app/(tabs)/Setting/index.tsx
        name="LoiSong/index"
        options={{
          title: 'Lối sống',
          tabBarIcon: ({ color }) => <TabBarIcon name="leaf" color={color} />,
        }}
      />
      <Tabs.Screen
        // Trỏ dến file app/(tabs)/Setting/index.tsx
        name="Setting/index"
        options={{
          title: 'Cài đặt',
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />

    </Tabs>
  );
}
