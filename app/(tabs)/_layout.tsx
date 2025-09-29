import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
      }}>
      <Tabs.Screen
        // Trỏ dến file app/(tabs)/HomePage/index.tsx
        name="HomePage/index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        // Trỏ dến file app/(tabs)/Monitoring/index.tsx
        name="Monitoring/index"
        options={{
          title: 'Theo dõi',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        // Trỏ dến file app/(tabs)/Setting/index.tsx
        name="LoiSong/index"
        options={{
          title: 'Lối sống',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        // Trỏ dến file app/(tabs)/Setting/index.tsx
        name="Setting/index"
        options={{
          title: 'Cài đặt',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      
    </Tabs>
  );
}
