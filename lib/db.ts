import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('notes.db');

export const initDB = () => {
  try {
    // db.execSync(`DROP TABLE IF EXISTS notes;`); 
    db.execSync(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        category TEXT,
        content TEXT,
        status TEXT
      );
    `);
  } catch (error) { console.log("DB init error:", error); }
};

export const addNoteDB = (title: string, category: string, content: string, status: string) => {
  db.runSync(
    "INSERT INTO notes (title, category, content, status) VALUES (?, ?, ?, ?);",
    [title, category, content, status]
  );
};

export const getNotesDB = () => {
  return db.getAllSync("SELECT * FROM notes ORDER BY id DESC;");
};

export const updateNoteDB = (id: number, title: string, category: string, content: string, status: string) => {
  db.runSync(
    "UPDATE notes SET title = ?, category = ?, content = ?, status = ? WHERE id = ?;",
    [title, category, content, status, id]
  );
};

export const deleteNoteDB = (id: number) => {
  db.runSync("DELETE FROM notes WHERE id = ?;", [id]);
};