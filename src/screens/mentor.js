import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput } from 'react-native';
import backendUrl from '../enviroment';
import TextMessage from './textMessaage';

export default function Mentor() {
    const [userData, setUserData] = useState([]);
    const [message, setMessage] = useState('')
    useEffect(() => {
        console.log('use Effect from Mentor')
        getUserData();
    }, [])

    const getUserData = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        await fetch(`${backendUrl}/getUser`)
            .then(response => response.json())
            .then(data => {
                console.log('data from get User', data)
                if (data.status == true) {
                    let filterData = data.data.filter((x) => {
                        return x.userType == 'Mentor'
                    })
                    console.log('filterData', filterData)
                    setUserData(filterData)
                }
                else {
                    alert(data.message)
                }
            }).catch(err => console.log('err', err))

    }
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={{ fontWeight: 'bold' }}>Mentors</Text>
            </View>
            <FlatList
                keyExtractor={userData => userData.email}
                data={userData} renderItem={({ item }) => {
                   return(
                       <TextMessage item={item}></TextMessage>
                   )
                }}
            />

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