import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import backendUrl from "../enviroment";

export default function Mentees() {
  const [mentesDetail, setMenteesDetail] = useState("");

  useEffect(() => {
    console.log("Use effect form mentees");
    menteesDetail();
  }, []);
  const menteesDetail = async () => {
    let mentorId = await AsyncStorage.getItem("user-id");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mentorId: mentorId,
      }),
    };
    await fetch(`${backendUrl}/getMenteesDetail`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("data from mentees detail ", data.data);
        if (data.status == true) {
          setMenteesDetail(data.data);
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.log("err", err));
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={{ fontWeight: "bold", marginTop: 20 }}>Menteess</Text>
      </View>
      <FlatList
        keyExtractor={(mentesDetail) => mentesDetail._id}
        data={mentesDetail}
        renderItem={({ item }) => {
          return (
              <View>
            <Text>
              FirstName= {item.userId.firstName}
              {"\n"} LastName= {item.userId.lastName}
              {"\n"} Message= {item.message}
              {"\n"}
            </Text>
            {/* <View style={{flexDirection:'row'}}>
            <Button 
           onPress={() => acceptMessage()}
            title='accept Message'
            />
            <View
             style={{paddingRight:10}}
            />
            <Button 
            onPress={() => declineMessage()}
            title='decline Message'
            />
            </View> */}
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    marginTop: 10,
  },
});
