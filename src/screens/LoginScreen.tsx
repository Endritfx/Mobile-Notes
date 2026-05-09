import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            Alert.alert("Success", "Logged in!");
            navigation.navigate("Home");
        } catch (error: any) {
            Alert.alert("Login Error", error.message);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 20,
                backgroundColor: "white",
            }}
        >
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 20,
                    color: "black",
                }}
            >
                Login
            </Text>

            <TextInput
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={{
                    borderWidth: 1,
                    padding: 12,
                    marginBottom: 12,
                    borderRadius: 8,
                    borderColor: "#ccc",
                    color: "black",
                    backgroundColor: "white",
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
                    padding: 12,
                    marginBottom: 20,
                    borderRadius: 8,
                    borderColor: "#ccc",
                    color: "black",
                    backgroundColor: "white",
                }}
            />

            <TouchableOpacity
                onPress={handleLogin}
                style={{
                    backgroundColor: "black",
                    padding: 15,
                    borderRadius: 8,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    Login
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                style={{
                    marginTop: 15,
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        color: "blue",
                    }}
                >
                    Don't have an account? Register
                </Text>
            </TouchableOpacity>
        </View>
    );
}