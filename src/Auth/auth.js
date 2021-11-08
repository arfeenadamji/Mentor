import React,{useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';

export default function Auth(props){
    const [email, setEmail] = useState("test@test.com");
    const [pass, setPass] = useState("test1234");

    const signIn=() =>{
        alert('jds')
    }
    return (
      <View style={styles.container}>
        <View>
        <Text style={styles.heading}>Mentor</Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          style={styles.inputEmail}
          onChangeText={(email) => setEmail(email)}
        />
  
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          value={pass}
          style={styles.inputPassword}
          onChangeText={(p) => setPass(p)}
        />
        <Button
          style={[styles.btn]}
          onPress={() => props.navigation.navigate("list")}
          // onPress={() => signIn()}
          onPress={() => props.navigation.navigate("Register")}
          title="Sign-In "
        />
        <View
          style={{
            paddingTop: 19,
          }}
        />
        <Button
          style={[styles.btnR]}
          title="Create New Account"
          onPress={() => props.navigation.navigate("Register")}
        />
      </View>
       
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    //   marginTop:20
    },
    textStyle: {
      fontSize: 10,
    },
    inputEmail: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      marginBottom: 25,
    },
    inputPassword: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      marginBottom: 25,
    },
    btn: {
      margin: 100,
      marginTop: 10,
    },
    heading: {
      textAlign: "center",
      fontSize: 30,
    },
    btnR: {
      margin: 100,
      marginTop: 50,
      paddingTop: 50,
    }
  });
  