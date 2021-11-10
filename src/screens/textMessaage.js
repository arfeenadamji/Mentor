import React, { useState } from 'react';
import {View, Text, Button, FlatList, StyleSheet,TextInput} from 'react-native';
import backendUrl from '../enviroment';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TextMessage({item}){
    const [message, setMessage] = useState('')
    const sendMessage = async (item) => {
        let userId = await AsyncStorage.getItem("user-id")
        let mentorId = item._id 
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: message,
                userId: userId,
                mentorId:mentorId

            }),
        };
        console.log(userId,mentorId)

        await fetch(`${backendUrl}/getMessage`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("data from get Message", data);
        // if (data.status == true) {
        //   alert("event created");
        //   console.log("event created");
        // } else {
        //   alert(data.message);
        // }
      })

    }
    return(
    <View>
        <Text>FirstName= {item.firstName}{'\n'} LastName= {item.lastName}{'\n'} Email= {item.email} {'\n'} Skills= {item.skills}{'\n'} UserType={item.userType}{'\n'}
        </Text>
        <View style={styles.textFieldContainer}>
            <TextInput
                value={message}
                onChangeText={(message) => setMessage(message)}
                style={styles.textField}
                placeholder="Send Message to Mentor" />
            <Button
                style={{ width: '40%' }}
                title="Send Message"
                onPress={() => sendMessage(item)}
            />
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingLeft: 10,
        flex: 1
    },
    textField: {
        width: '60%',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10
    },
    textFieldContainer: {
        flexDirection: 'row',
        marginTop: -10,
        marginBottom: 20
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        marginTop: 10
    }
})