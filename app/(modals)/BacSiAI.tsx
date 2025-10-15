// // app/(tabs)/HomePage/CanNangVaBMI.tsx
// import { View, Text } from 'react-native';

// export default function BacSiAI() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Màn Bác Sĩ AI</Text>
//     </View>
//   );
// }


import DoctorSpecialtyCard from '@/components/components_doctorAI/doctorSpecially';
import QuestionCard from '@/components/components_doctorAI/questionDoctor';
import AskDoctorBanner from '@/components/components_doctorAI/askDoctorBanner';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from "expo-router";


const SPECIALISTS = [
  { id: '1', name: 'Cardiologists', specialty: 'Heart', icon: '❤️', avatar: '👨‍⚕️' },
  { id: '2', name: 'Hematologists', specialty: 'Blood', icon: '🩸', avatar: '👩‍⚕️' },
  { id: '3', name: 'Endocrinologists', specialty: 'Hormones', icon: '💊', avatar: '👨‍⚕️' },
  { id: '4', name: 'Internists', specialty: 'General', icon: '🫁', avatar: '👨‍⚕️' },
  { id: '5', name: 'Nutritionists', specialty: 'Nutrition', icon: '🥗', avatar: '👩‍⚕️' },
];

const COMMON_QUESTIONS = [
  'My blood pressure is a bit high, do I have high blood pressure?',
  'I feel a bit nauseous...',
  'What could be the cause of my headache?',
  'Did I catch a cold again? What are the ways to prevent catching a cold?',
];

export default function AIDoctorScreen() {
  const router = useRouter();

  const handleAskQuestion = (predefinedQuestion?: string) => {
    // Navigate to chat screen with optional predefined question
    router.push({
      pathname: './ScreenBacSiAI/Chat_DoctorAI',
      params: { question: predefinedQuestion || '' },
    });
  }


  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Bác Sĩ AI hỗ trợ" }} />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Ask Doctor Banner */}
          <AskDoctorBanner />

          {/* Specialist Doctors Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionIcon}>👨‍⚕️</Text>
                <Text style={styles.sectionTitle}>bác sĩ chuyên khoa</Text>
              </View>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>Nhìn thấy tất cả</Text>
                <Text style={styles.seeAllArrow}> ›</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.specialistScroll}
              contentContainerStyle={styles.specialistContent}
            >
              {SPECIALISTS.map((specialist) => (
                <DoctorSpecialtyCard
                  key={specialist.id}
                  name={specialist.name}
                  specialty={specialist.specialty}
                  icon={specialist.icon}
                  avatar={specialist.avatar}
                  onPress={() => handleAskQuestion()}
                />
              ))}
            </ScrollView>
          </View>

          {/* Common Questions Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionIcon}>💡</Text>
                <Text style={styles.sectionTitle}>Các câu hỏi thường gặp</Text>
              </View>
            </View>

            <View style={styles.questionsContainer}>
              {COMMON_QUESTIONS.map((question, index) => (
                <QuestionCard
                  key={index}
                  question={question}
                  onPress={() => handleAskQuestion(question)}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#1a1a1a',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    flex: 1,
    marginLeft: 8,
    includeFontPadding: false,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  favoriteIcon: {
    fontSize: 16,
  },
  creditBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#3F8F75',
  },
  creditIcon: {
    fontSize: 13,
    marginRight: 2,
  },
  creditText: {
    fontSize: 12,
    color: '#3F8F75',
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 6,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginLeft: 8,
  },
  seeAllText: {
    fontSize: 13,
    color: '#3F8F75',
    fontWeight: '600',
  },
  seeAllArrow: {
    fontSize: 16,
    color: '#3F8F75',
    fontWeight: '600',
    marginLeft: 2,
  },
  specialistScroll: {
    marginHorizontal: -16,
  },
  specialistContent: {
    paddingHorizontal: 16,
  },
  questionsContainer: {
    marginTop: 4,
  },
});