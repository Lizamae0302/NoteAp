import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addNoteDB } from '../../../lib/db';

export default function AddNote() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('Pending');
  const router = useRouter();

  const handleSave = () => {
    if (!title.trim() || !category.trim() || !content.trim()) return Alert.alert("Wait!", "Fill everything.");
    addNoteDB(title.trim(), category.trim(), content.trim(), status);
    setTimeout(() => { router.back(); }, 50);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Note Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Category</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} />
      <Text style={styles.label}>Status</Text>
      <View style={styles.statusRow}>
        {['Pending', 'Ongoing', 'Finished'].map((s) => (
          <TouchableOpacity key={s} style={[styles.statusBtn, status === s && styles.statusBtnActive]} onPress={() => setStatus(s)}>
            <Text style={[styles.statusBtnText, status === s && styles.statusBtnTextActive]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Details</Text>
      <TextInput style={[styles.input, { height: 120 }]} multiline value={content} onChangeText={setContent} />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}><Text style={styles.saveButtonText}>Save Note Task</Text></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: '#fff', flexGrow: 1 },
  label: { fontWeight: 'bold', marginTop: 15, color: '#333' },
  input: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 10, marginTop: 8 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  statusBtn: { flex: 1, padding: 12, backgroundColor: '#eee', marginHorizontal: 4, borderRadius: 10, alignItems: 'center' },
  statusBtnActive: { backgroundColor: '#f4511e' },
  statusBtnText: { fontWeight: '600', color: '#666' },
  statusBtnTextActive: { color: '#fff' },
  saveButton: { backgroundColor: '#f4511e', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 30 },
  saveButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});