import { View, Text, TouchableOpacity } from "react-native";

import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export default function HomeScreen({ navigation }: any) {
    const handleLogout = async () => {
        await signOut(auth);

        navigation.replace("Login");
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                padding: 20,
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
                Welcome 🚀
            </Text>

            <Text
                style={{
                    marginBottom: 30,
                    color: "gray",
                }}
            >
                You are logged in.
            </Text>

            <TouchableOpacity
                onPress={handleLogout}
                style={{
                    backgroundColor: "red",
                    padding: 15,
                    borderRadius: 8,
                    width: "100%",
                }}
            >
                <Text
                    style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    );
}