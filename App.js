import { StatusBar } from 'expo-status-bar';
import { StyleSheet,onChangeText, TextInput, Text, View, Button } from 'react-native';


export default function App() {
  return (
    <View>
      <Text style = {[styles.title]}>To Do List</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={Text}
      />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title:{
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 80,
  },

  input: {
    height: 40,
    margin: 20,
    borderWidth: 2,
    padding: 5,
    marginVertical: -20,
  }
});
