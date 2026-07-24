import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";

import { signOut } from "firebase/auth";
import { router } from "expo-router";

import { auth } from "../services/firebase";

import { createNote, getNotes, deleteNote, updateNote } from "../services/notesService";

import NetInfo from "@react-native-community/netinfo";

import { saveLocalNotes, getLocalNotes } from "../storage/localNotes";

export default function HomeScreen() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notes, setNotes] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isOnline, setIsOnline] = useState(true);
    const [lastSync, setLastSync] = useState("");
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

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
        if (!title || !content) {
            setError("Please fill all fields.");
            return;
        }

        setError("");

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

        if (editingId === id) {
            setEditingId(null);
            setTitle("");
            setContent("");
        }

        loadNotes();
    };

    const handleLogout = async () => {
        await signOut(auth);

        router.replace("/login");
    };

    const filteredNotes = notes.filter(
        (note) =>
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.content.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#f3f4f6",
            }}
            contentContainerStyle={{
                alignItems: "center",
                padding: 20,
                paddingBottom: 60,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View
                style={{
                    width: "100%",
                    maxWidth: 700,
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 24,
                    marginTop: 40,
                    shadowColor: "#000",
                    shadowOpacity: 0.08,
                    shadowRadius: 10,
                    elevation: 5,
                }}
            >
                <Text
                    style={{
                        fontSize: 36,
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "black",
                        marginBottom: 10,
                    }}
                >
                    My Notes
                </Text>

                <Text
                    style={{
                        textAlign: "center",
                        color: isOnline ? "green" : "red",
                        fontWeight: "bold",
                        fontSize: 16,
                        marginBottom: 8,
                    }}
                >
                    {isOnline ? "🟢 Online" : "🔴 Offline"}
                </Text>

                <Text
                    style={{
                        textAlign: "center",
                        color: "gray",
                        marginBottom: 25,
                    }}
                >
                    Last Sync: {lastSync || "Not synced yet"}
                </Text>

                <TextInput
                    placeholder="Search notes..."
                    placeholderTextColor="gray"
                    value={search}
                    onChangeText={setSearch}
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
                    placeholder="Title"
                    placeholderTextColor="gray"
                    value={title}
                    onChangeText={setTitle}
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
                    placeholder="Content"
                    placeholderTextColor="gray"
                    value={content}
                    onChangeText={setContent}
                    multiline
                    numberOfLines={4}
                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        borderRadius: 12,
                        padding: 15,
                        marginBottom: 20,
                        color: "black",
                        backgroundColor: "#fafafa",
                        height: 110,
                        textAlignVertical: "top",
                    }}
                />

                {error ? (
                    <Text
                        style={{
                            color: "red",
                            marginBottom: 15,
                            fontWeight: "bold",
                        }}
                    >
                        {error}
                    </Text>
                ) : null}


                <TouchableOpacity
                    onPress={handleAddNote}
                    style={{
                        backgroundColor: "black",
                        padding: 18,
                        borderRadius: 12,
                        marginBottom: 25,
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
                        {editingId ? "Save Changes" : "Add Note"}
                    </Text>
                </TouchableOpacity>

                {filteredNotes.length === 0 ? (
                    <Text
                        style={{
                            textAlign: "center",
                            color: "gray",
                            fontSize: 16,
                            marginBottom: 20,
                        }}
                    >
                        No notes found
                    </Text>
                ) : (
                    filteredNotes.map((item) => (
                        <View
                            key={item.id}
                            style={{
                                backgroundColor: "#fafafa",
                                borderWidth: 1,
                                borderColor: "#e5e5e5",
                                borderRadius: 14,
                                padding: 18,
                                marginBottom: 15,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: "black",
                                    marginBottom: 8,
                                }}
                            >
                                {item.title}
                            </Text>

                            <Text
                                style={{
                                    color: "#555",
                                    fontSize: 15,
                                    marginBottom: 15,
                                    lineHeight: 22,
                                }}
                            >
                                {item.content}
                            </Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 10,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        setTitle(item.title);
                                        setContent(item.content);
                                        setEditingId(item.id);
                                    }}
                                    style={{
                                        backgroundColor: "#2563eb",
                                        paddingVertical: 10,
                                        paddingHorizontal: 16,
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "white",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Edit
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => handleDelete(item.id)}
                                    style={{
                                        backgroundColor: "#dc2626",
                                        paddingVertical: 10,
                                        paddingHorizontal: 16,
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "white",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}

                <TouchableOpacity
                    onPress={handleLogout}
                    style={{
                        backgroundColor: "#ef4444",
                        padding: 16,
                        borderRadius: 12,
                        marginTop: 10,
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
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}