import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { updateNoteDB } from '../../../lib/db';

export default function Detail() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(String(params.title || ""));
  const [category, setCategory] = useState(String(params.category || ""));
  const [content, setContent] = useState(String(params.content || ""));
  const [currentStatus, setCurrentStatus] = useState(String(params.status || "Pending"));

  const handleUpdateMemo = () => {
    if (!title.trim()) return Alert.alert("Wait!", "Title cannot be empty.");
    updateNoteDB(Number(params.id), title.trim(), category.trim(), content.trim(), currentStatus);
    Alert.alert("Success", "Task updated!");
    setIsEditing(false); 
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.label}>Note Task Details</Text>
          <TouchableOpacity 
            style={[styles.editToggle, isEditing && styles.editToggleActive]} 
            onPress={() => setIsEditing(!isEditing)}
          >
            <Ionicons name={isEditing ? "eye-outline" : "create-outline"} size={18} color={isEditing ? "#fff" : "#f4511e"} />
            <Text style={[styles.editToggleText, isEditing && {color: '#fff'}]}>{isEditing ? "Viewing" : "Edit Note Task"}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.fieldLabel}>Title</Text>
        <TextInput style={[styles.titleInput, !isEditing && styles.readOnlyInput]} value={title} onChangeText={setTitle} editable={isEditing} />
        <View style={styles.divider} />
        
        <Text style={styles.fieldLabel}>Category</Text>
        <TextInput style={[styles.categoryInput, !isEditing && styles.readOnlyInput]} value={category} onChangeText={setCategory} editable={isEditing} />
        <View style={styles.divider} />

        <Text style={styles.fieldLabel}>Status</Text>
        <View style={styles.statusRow}>
          {['Pending', 'Ongoing', 'Finished'].map((s) => (
            <TouchableOpacity 
              key={s} 
              disabled={!isEditing}
              style={[styles.statusBtn, currentStatus === s ? styles.statusBtnActive : styles.statusBtnInactive, !isEditing && currentStatus !== s && { opacity: 0.3 }]}
              onPress={() => setCurrentStatus(s)}
            >
              <Text style={[styles.statusBtnText, currentStatus === s && styles.statusBtnTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.divider} />
        
        <Text style={styles.fieldLabel}>Details</Text>
        <TextInput style={[styles.contentInput, !isEditing && styles.readOnlyInput]} multiline value={content} onChangeText={setContent} editable={isEditing} textAlignVertical="top" />
        
        {isEditing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleUpdateMemo}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>Back to List</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f9f9f9', flexGrow: 1 },
  card: { backgroundColor: 'white', borderRadius: 25, padding: 25, elevation: 5 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#999', textTransform: 'uppercase' },
  editToggle: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#f4511e' },
  editToggleActive: { backgroundColor: '#f4511e' },
  editToggleText: { marginLeft: 5, fontWeight: 'bold', color: '#f4511e', fontSize: 12 },
  fieldLabel: { fontSize: 12, fontWeight: 'bold', color: '#f4511e', marginBottom: 5 },
  titleInput: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  categoryInput: { fontSize: 16, color: '#444', backgroundColor: '#f5f5f5', padding: 12, borderRadius: 10, marginTop: 5 },
  readOnlyInput: { backgroundColor: 'transparent', paddingLeft: 0, color: '#666' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  statusBtn: { flex: 1, padding: 12, marginHorizontal: 4, borderRadius: 10, alignItems: 'center' },
  statusBtnActive: { backgroundColor: '#f4511e' },
  statusBtnInactive: { backgroundColor: '#eee' },
  statusBtnText: { fontWeight: '600', color: '#666' },
  statusBtnTextActive: { color: '#fff' },
  contentInput: { fontSize: 16, marginTop: 10, lineHeight: 24, color: '#444', minHeight: 120 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  saveButton: { backgroundColor: '#f4511e', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 20 },
  saveText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  backButton: { backgroundColor: '#333', padding: 15, borderRadius: 15, alignItems: 'center', marginTop: 20 },
  backText: { color: 'white', fontWeight: 'bold' }
});