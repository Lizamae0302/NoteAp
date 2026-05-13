import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteNoteDB, getNotesDB } from '../../database/db';

export default function NotesList() {
  const router = useRouter();
  const [notes, setNotes] = useState<any[]>([]);

  const loadNotes = useCallback(() => {
    const data = getNotesDB();
    setNotes([...data]); 
  }, []);

  useFocusEffect(useCallback(() => { loadNotes(); }, [loadNotes]));

  const getStatusColor = (status: string) => {
    if (status === 'Finished') return '#4CAF50';
    if (status === 'Ongoing') return '#FF9800';
    return '#f4511e';
  };

  // Function to handle the delete confirmation
  const confirmDelete = (id: number) => {
    Alert.alert(
      "Delete Note", // Title
      "Do you really want to delete this note?", // Message
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            deleteNoteDB(id);
            loadNotes();
          },
          style: "destructive" 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.headerRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.badgeText}>{item.status || 'Pending'}</Text>
              </View>
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity 
                style={styles.viewButton} 
                onPress={() => router.push({ pathname: "./detail", params: item })}
              >
                <Ionicons name="eye-outline" size={18} color="#f4511e" />
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>

              {/* Trash Icon with confirmation alert */}
              <TouchableOpacity 
                onPress={() => confirmDelete(item.id)} 
                style={styles.trashIcon}
              >
                <Ionicons name="trash-outline" size={20} color="#f4511e" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={() => router.push('./add')}>
        <Ionicons name="add" size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 15 },
  card: { backgroundColor: '#fff', padding: 20, marginBottom: 15, borderRadius: 15, elevation: 3 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  categoryText: { color: '#f4511e', fontSize: 14, marginTop: 4, fontWeight: '600' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  actionRow: { flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', alignItems: 'center' },
  viewButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff3f0', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10 },
  viewButtonText: { color: '#f4511e', fontWeight: 'bold', marginLeft: 8 },
  trashIcon: { padding: 8, backgroundColor: '#fff3f0', borderRadius: 8 },
  fab: { position: 'absolute', right: 25, bottom: 80, backgroundColor: '#f4511e', width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center', elevation: 8 }
});