import { StyleSheet, Text, View } from 'react-native';


export default function AlertScreen() {
  return (
    <View style={styles.container}>
   <Text style={styles.title}>Đây là trang Alert</Text>

         <Text style={{ fontSize: 24, marginBottom: 20 }}> Alert </Text>
     
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
