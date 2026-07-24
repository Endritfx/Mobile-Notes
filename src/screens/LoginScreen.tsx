import { useState } from "react";

import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../services/firebase";
import { router } from "expo-router";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {

        if (!email || !password) {
            setError("Please fill all fields.");
            return;
        }

        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);

            Alert.alert("Success", "Logged in!");

            router.replace("/home");
        } catch (error: any) {
            setError("Invalid email or password.");
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
                    Welcome Back
                </Text>

                <Text
                    style={{
                        textAlign: "center",
                        color: "gray",
                        marginBottom: 30,
                        fontSize: 16,
                    }}
                >
                    Login to continue using your notes
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
                {error ? (
                    <Text
                        style={{
                            color: "red",
                            marginBottom: 15,
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        {error}
                    </Text>
                ) : null}
                <TouchableOpacity
                    onPress={handleLogin}
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
                        Login
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/register")}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "#2563eb",
                            fontWeight: "600",
                            fontSize: 15,
                        }}
                    >
                        Don't have an account? Register
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}