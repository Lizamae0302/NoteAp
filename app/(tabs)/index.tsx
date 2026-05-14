import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.circle} />
      <View style={styles.content}>
        <Text style={styles.emoji}>🗒️</Text>
        <Text style={styles.title}>MemoPad</Text>
        <Text style={styles.subtitle}>Write, Thoughts, Imagine, Anywhere.</Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('/tasks/notes')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>View My Notes</Text>
          <Ionicons name="arrow-forward" size={22} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.version}>v1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  circle: { position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: 150, backgroundColor: '#fff3f0' },
  content: { alignItems: 'center', width: '100%', paddingHorizontal: 40 },
  emoji: { fontSize: 80, marginBottom: 10 },
  title: { fontSize: 36, fontWeight: '800', color: '#333', letterSpacing: -1 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40, marginTop: 5 },
  button: { backgroundColor: '#f4511e', paddingVertical: 18, paddingHorizontal: 30, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', elevation: 8, shadowColor: '#f4511e', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 10 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 10 },
  version: { position: 'absolute', bottom: 40, color: '#ccc', fontSize: 12, letterSpacing: 2 }
});