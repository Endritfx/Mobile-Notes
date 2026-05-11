import { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../services/firebase";

export default function RegisterScreen({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {

        if (!email || !password) {
            Alert.alert(
                "Missing Fields",
                "Please fill all fields."
            );
            return;
        }
        try {
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            Alert.alert("Success", "Account created!");

            navigation.navigate("Home");
        } catch (error: any) {
            Alert.alert("Register Error", error.message);
        }
    };

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#f3f4f6",
            }}
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View
                style={{
                    width: "100%",
                    maxWidth: 500,
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 30,
                    shadowColor: "#000",
                    shadowOpacity: 0.08,
                    shadowRadius: 10,
                    elevation: 5,
                }}
            >
                <Text
                    style={{
                        fontSize: 38,
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "black",
                        marginBottom: 10,
                    }}
                >
                    Create Account
                </Text>

                <Text
                    style={{
                        textAlign: "center",
                        color: "gray",
                        marginBottom: 30,
                        fontSize: 16,
                    }}
                >
                    Register to start saving your notes
                </Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="gray"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        borderRadius: 12,
                        padding: 15,
                        marginBottom: 15,
                        color: "black",
                        backgroundColor: "#fafafa",
                    }}
                />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="gray"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        borderRadius: 12,
                        padding: 15,
                        marginBottom: 20,
                        color: "black",
                        backgroundColor: "#fafafa",
                    }}
                />

                <TouchableOpacity
                    onPress={handleRegister}
                    style={{
                        backgroundColor: "black",
                        padding: 18,
                        borderRadius: 12,
                        marginBottom: 15,
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: 16,
                        }}
                    >
                        Register
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Login")
                    }
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "#2563eb",
                            fontWeight: "600",
                            fontSize: 15,
                        }}
                    >
                        Already have an account? Login
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}