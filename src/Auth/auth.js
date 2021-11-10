import React,{useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import backendUrl from '../enviroment';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Auth(props){
    const [email, setEmail] = useState("arfeenm9@gmail.com");
    const [pass, setPass] = useState("test123");

    const signIn= async() =>{
        const requestOptions = {
          method:"POST",
          headers:{"Content-type": "application/json"},
          body:JSON.stringify({email:email,pass:pass})
        };
        await fetch(`${backendUrl}/signIn`,requestOptions)
        .then((response) => response.json())
        .then(async (data) =>{
                   for(let i=0; i<data.data.length; i++){
            // console.log("data.data[0].email", data.data[i].email);
          }
          if (data.status == true) {
            try {
              await AsyncStorage.setItem("user-id", data.data[0]._id);
            } catch (e) {
              console.log("error from aysnc", e);
            }
            props.navigation.navigate("tem", { profile: data });
            console.log("user already created");
          } else {
            alert(data.message);
          }
        })
        .catch((err) => console.log("err", err));
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
          onPress={() => signIn()}
          // onPress={() => props.navigation.navigate("Register")}
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
  