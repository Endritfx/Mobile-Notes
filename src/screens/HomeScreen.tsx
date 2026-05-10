import { useEffect, useState } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
} from "react-native";

import { signOut } from "firebase/auth";

import { auth } from "../services/firebase";

import {
    createNote,
    getNotes,
    deleteNote,
    updateNote,
} from "../services/notesService";

import NetInfo from "@react-native-community/netinfo";

import {
    saveLocalNotes,
    getLocalNotes,
} from "../storage/localNotes";

export default function HomeScreen({ navigation }: any) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notes, setNotes] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isOnline, setIsOnline] = useState(true);
    const [lastSync, setLastSync] = useState("");

    const loadNotes = async () => {
        try {
            const netInfo = await NetInfo.fetch();

            if (netInfo.isConnected) {
                const data = await getNotes();

                setNotes(data as any[]);

                await saveLocalNotes(data as any[]);
                setLastSync(new Date().toLocaleTimeString());
            } else {
                const localData = await getLocalNotes();

                setNotes(localData);
            }
        } catch (error) {
            const localData = await getLocalNotes();

            setNotes(localData);
        }
    };

    useEffect(() => {
        loadNotes();

        const unsubscribe = NetInfo.addEventListener(async (state) => {
            const connected = !!state.isConnected;

            setIsOnline(connected);

            if (connected) {
                await loadNotes();
            }
        });

        return () => unsubscribe();
    }, []);

    const handleAddNote = async () => {
        if (!title || !content) return;

        if (editingId) {
            await updateNote(editingId, title, content);

            setEditingId(null);
        } else {
            await createNote(title, content);
        }

        setTitle("");
        setContent("");

        loadNotes();
    };

    const handleDelete = async (id: string) => {
        await deleteNote(id);

        loadNotes();
    };

    const handleLogout = async () => {
        await signOut(auth);

        navigation.replace("Login");
    };

    return (
        <View
            style={{
                flex: 1,
                padding: 20,
                backgroundColor: "white",
            }}
        >
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    marginTop: 60,
                    marginBottom: 20,
                    color: "black",
                }}
            >
                My Notes 🚀
            </Text>
            <View
                style={{
                    marginBottom: 20,
                }}
            >
                <Text
                    style={{
                        color: isOnline ? "green" : "red",
                        fontWeight: "bold",
                    }}
                >
                    {isOnline ? "🟢 Online" : "🔴 Offline"}
                </Text>
            </View>
            <View
                style={{
                    marginBottom: 20,
                }}
            >
                <Text
                    style={{
                        color: "gray",
                        fontSize: 12,
                    }}
                >
                    Last Sync: {lastSync || "Not synced yet"}
                </Text>
            </View>

            <TextInput
                placeholder="Title"
                placeholderTextColor="gray"
                value={title}
                onChangeText={setTitle}
                style={{
                    borderWidth: 1,
                    padding: 12,
                    marginBottom: 10,
                    borderRadius: 8,
                    borderColor: "#ccc",
                    color: "black",
                }}
            />

            <TextInput
                placeholder="Content"
                placeholderTextColor="gray"
                value={content}
                onChangeText={setContent}
                style={{
                    borderWidth: 1,
                    padding: 12,
                    marginBottom: 10,
                    borderRadius: 8,
                    borderColor: "#ccc",
                    color: "black",
                }}
            />

            <TouchableOpacity
                onPress={handleAddNote}
                style={{
                    backgroundColor: "black",
                    padding: 15,
                    borderRadius: 8,
                    marginBottom: 20,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    {editingId ? "Update Note" : "Add Note"}
                </Text>
            </TouchableOpacity>

            <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: "#ddd",
                            padding: 15,
                            borderRadius: 8,
                            marginBottom: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                color: "black",
                            }}
                        >
                            {item.title}
                        </Text>

                        <Text
                            style={{
                                marginTop: 5,
                                color: "gray",
                            }}
                        >
                            {item.content}
                        </Text>

                        <TouchableOpacity
                            onPress={() => handleDelete(item.id)}
                            style={{
                                marginTop: 10,
                            }}
                        >
                            <Text
                                style={{
                                    color: "red",
                                    fontWeight: "bold",
                                }}
                            >
                                Delete
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setTitle(item.title);
                                setContent(item.content);
                                setEditingId(item.id);
                            }}
                            style={{
                                marginTop: 10,
                            }}
                        >
                            <Text
                                style={{
                                    color: "blue",
                                    fontWeight: "bold",
                                }}
                            >
                                Edit
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <TouchableOpacity
                onPress={handleLogout}
                style={{
                    backgroundColor: "red",
                    padding: 15,
                    borderRadius: 8,
                    marginTop: 10,
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