import React, { useEffect, useState } from 'react';
import {View, Text, Button, FlatList,StyleSheet} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import backendUrl from '../enviroment';


export default function Mentees(){
    const [mentesDetail, setMenteesDetail] = useState('')
    useEffect(() =>{
        console.log('Use effect form mentees')
        menteesDetail()

    },[])
    const menteesDetail= async () =>{
        let mentorId = await AsyncStorage.getItem("user-id")

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mentorId:mentorId

            }),
        };
        // console.log('mentorId:',mentorId)
        // return
        await fetch(`${backendUrl}/getMenteesDetail`,requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('data from mentees detail ', data.data[0].userId.firstName)
                console.log('data from mentees detail 1211222', data[0].userId.firstName)
                
                if (data.status == true) {
                    // let filterData = data.data.filter((x) => {
                    //     return x.userType == 'Mentor'
                    // })
                    // console.log('filterData', filterData)
                    // setUserData(filterData)
                    // console.log('DATA FROM GET MENTEES DETAILS', data.data)
                    setMenteesDetail(mentesDetail)
                }
                else {
                    alert(data.message)
                }
            }).catch(err => console.log('err', err))
    }
    return(
        <View style={styles.container}>
            <Text>Mentees Screen</Text>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        alignItems:'center',justifyContent:'center',flex:1
    }
})