import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, View, Button, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleTextChange = (input) => setText(input);
  const handleSearchTextChange = (input) => setSearchText(input);

  const addTask = () => {
    if (text.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), task: text, pinned: false }]);
      resetInput();
    }
  };

  const editTask = () => {
    if (text.trim()) {
      setTasks(tasks.map(task => task.id === editingTaskId ? { ...task, task: text } : task));
      resetInput();
    }
  };

  const startEditing = (task) => {
    setText(task.task);
    setIsEditing(true);
    setEditingTaskId(task.id);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    resetInput();
  };

  const pinTask = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, pinned: !task.pinned } : task));
  };

  const resetInput = () => {
    setText('');
    setIsEditing(false);
    setEditingTaskId(null);
  };

  const filteredTasks = tasks.filter(task => task.task.toLowerCase().includes(searchText.toLowerCase()));

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.task}</Text>
      <TouchableOpacity onPress={() => pinTask(item.id)}>
        <Text style={styles.pinButton}>{item.pinned ? "Unpin" : "Pin"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => startEditing(item)}>
        <Text style={styles.editButton}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do List</Text>

      <TextInput
        style={styles.searchInput}
        onChangeText={handleSearchTextChange}
        value={searchText}
        placeholder="Search tasks"
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        onChangeText={handleTextChange}
        value={text}
        placeholder="Enter a task"
        placeholderTextColor="#aaa"
      />

      {text.trim() && (
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={resetInput} color="red" />
          <Button title={isEditing ? "Edit Task" : "Add Task"} onPress={isEditing ? editTask : addTask} color="green" />
        </View>
      )}

      <FlatList
        data={filteredTasks.sort((a, b) => b.pinned - a.pinned)}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        style={styles.taskList}
      />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchInput: {
    borderColor: 'white',
    borderWidth: 2,
    color: 'white',
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
    paddingVertical: 5,
  },
  input: {
    borderColor: 'white',
    borderWidth: 2,
    color: 'white',
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  taskList: {
    width: '100%',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  taskText: {
    color: 'white',
    flex: 1,
  },
  pinButton: {
    color: '#00ff00',
    marginLeft: 10,
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
  },
  editButton: {
    color: 'yellow',
    marginLeft: 10,
  },
  
});
