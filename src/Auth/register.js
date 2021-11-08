import React, { useState } from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RadioGroup from 'react-native-radio-buttons-group';





const radioButtonsData = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Male',
    value: 'male'
}, {
    id: '2',
    label: 'Female',
    value: 'female'
}]

export default function Register(props) {
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [degree, setDegree] = useState("");
    const [skill, setSkill] = useState("");
    const [pass, setPass] = useState("");
const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    function onPressRadioButton(radioButtonsArray,e) {
        setRadioButtons(radioButtonsArray);
        console.log('radioButtonsArray',radioButtonsArray)
    }

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    // let newTime = new Date(time).getHours() + ':' + new Date(time).getMinutes()

      const signUp = async () => {

        console.log(new Date(time).getHours() +':'+ new Date(time).getMinutes() > 10 ? + 0 : new
        Date(time).getMinutes())
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            contact:contact,
            email: email,
            pass: pass,
            date:date,
            degree:degree,
            skill:skill
          

          }),
        };
        console.log(firstName,lastName,email,pass,contact,date,degree,skill)
        return
        await fetch(`${backendUrl}/Register`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log("data", data);
            if (data.status == true) {
              // props.navigation.navigate('list')
              alert("user register");
              console.log("user already created");
            } else {
              alert(data.message);
            }
          });
      };

    return (
        <View>
            <Text style={styles.heading}>Sign Up</Text>
            <View style={{ flexDirection: "row" }}>
                <TextInput
                    style={styles.name}
                    autoCapitalize="none"
                    placeholder="First Name"
                    onChangeText={(firstName) => setFirstName(firstName)}
                />
                <TextInput
                    placeholder="Last Name"
                    autoCapitalize="none"
                    style={styles.name}
                    onChangeText={(lastName) => setLastName(lastName)}
                />
            </View>
            <View style={{ flexDirection: "row" }}>
            <TextInput
                placeholder="Contact"
                autoCapitalize="none"
                onChangeText={(contact) => setContact(contact)}
                style={styles.name}
            />
            <TextInput
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(email) => setEmail(email)}
                style={styles.name}
            />
            
</View>
            <TextInput
                placeholder="password"
                autoCapitalize="none"
                onChangeText={(pass) => setPass(pass)}
                style={styles.input}
                secureTextEntry
            />
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>DOB</Text>
                <DateTimePicker
                    style={styles.picker}
                    display="calendar"
                    isVisible={isDatePickerVisible}
                    // value={date}
                    value={new Date(date)}
                    mode="date"
                    onChangeText={(date) => setDate(date)}
                    onChange={(event, dates) => setDate(dates)}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
            <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>Degree</Text>
            <TextInput
                placeholder="Highest Degree"
                autoCapitalize="none"
                onChangeText={(degree) => setDegree(degree)}
                style={styles.name}
            />
            </View>

            <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>Skills</Text>
            <TextInput
                placeholder="Skills"
                autoCapitalize="none"
                onChangeText={(skill) => setSkill(skill)}
                style={styles.name}
            />
            </View>
            <View style={{paddingLeft:10}}>
            <Text style={styles.gender}>Gender</Text>
            <RadioGroup
                radioButtons={radioButtons}
                onPress={onPressRadioButton}
                layout='row'
            />
            </View>
            <Button
                style={styles.btn}
                title="Sign Up"
            onPress={() => signUp()}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    pickerContainer: {
        alignItems: 'center',
        flexDirection: "row",
        height: '10%',
    },
    picker: {
        width: '40%',
        height: '100%',
        marginRight: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gender:{
        paddingLeft:10,
        paddingBottom:8,
          width: "40%",
          fontWeight: 'bold',
          borderRadius: 10,
    },
    label: {
        height: 40,
        width: "40%",
        margin: 12,
        fontWeight: 'bold',
        padding: 10,
        borderRadius: 10,
    },
    name: {
        height: 40,
        width: "40%",
        padding: 10,
        margin: 12,
        borderWidth: 1,

        borderRadius: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,

    },
    btn: {
        margin: 100,
    },
    heading: {
        textAlign: "center",
        fontSize: 30,
    },
});
