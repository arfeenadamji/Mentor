import React, { useState } from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RadioGroup from 'react-native-radio-buttons-group';
import backendUrl from "../enviroment";

const genderData = [{
    id: '1',
    label: 'Male',
    value: 'male'
}, {
    id: '2',
    label: 'Female',
    type: 'female'
}]
const userTypeData = [{
    id: '1',
    label: 'Mentees',
    type: 'mentees'
},
{
    id: '2',
    label: 'Mentor',
    type: 'mentor'
}
]

export default function Register(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // for date
    const [degree, setDegree] = useState("");
    const [skill, setSkill] = useState("");
    const [gender, setGender] = useState(genderData)
    const [userType, setUserType] = useState(userTypeData)

    function onPressGenderBtn(genderArray) {
        setGender(genderArray);
    }

    const onPressUserTypeBtn = (userArray) => {
        setUserType(userArray)
    }

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const signUp = async () => {
        let tempGender = gender.filter((x) => {
            return x.selected
        })
        let genderSelected = tempGender[0].label

        let tempType = userType.filter((x) => {
            return x.selected
        })
        let userTypeSelected = tempType[0].label

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                contact: contact,
                email: email,
                pass: pass,
                date: date.toString().substr(4, 12),
                degree: degree,
                skill: skill,
                gender: genderSelected,
                userType: userTypeSelected
            }),
        };
        console.log(requestOptions)
        // return
        console.log(firstName, lastName, contact, email, pass, date, degree, skill, genderSelected, userTypeSelected)
        await fetch(`${backendUrl}/signUp`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log("data", data);
                if (data.status == true) {
                    // props.navigation.navigate('list')
                    alert("user register");
                    console.log("user already created");
                } else {

                    alert('data.message', data.message);
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
            <View style={{ paddingLeft: 10, flexDirection: 'row', paddingTop: 10 }}>
                <Text style={styles.gender}>Gender</Text>
                <RadioGroup
                    radioButtons={gender}
                    onPress={onPressGenderBtn}
                    layout='row'
                />
            </View>
            <View style={{ paddingLeft: 10, flexDirection: 'row', paddingTop: 10 }}>
                <Text style={styles.gender}>User Type</Text>
                <RadioGroup
                    radioButtons={userType}
                    onPress={onPressUserTypeBtn}
                    layout='row'
                // size={16}
                />
            </View>
            <View
                style={{
                    paddingTop: 10,
                }} />
            <Button
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
        height:'40',
        width: '40%',
        marginLeft: 13,
        height: '100%'
    },
    gender: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 8,
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
        width: "85%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,

    },
    btn: {
        // margin: 100,
        // paddingTop:20,
        // marginTop:20
    },
    heading: {
        textAlign: "center",
        fontSize: 30,
    },
});