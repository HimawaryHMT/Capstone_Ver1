import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  // Giả sử bạn có một trạng thái để kiểm tra cảnh báo
  const hasAlert = true; // Thay đổi giá trị này để kiểm tra

  return (
    <Tabs
      screenOptions={{
      }}>
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
          title: 'Theo dõi',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="exclamation-triangle"  // hoặc "bell", "bullhorn"
              color={hasAlert ? 'red' : 'green'}  // Đỏ khi cảnh báo, xanh khi OK
            />
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
