import {
    addDoc,
    collection,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";

import { auth, db } from "./firebase";

export const createNote = async (
    title: string,
    content: string
) => {
    const user = auth.currentUser;

    if (!user) return;

    await addDoc(
        collection(db, "users", user.uid, "notes"),
        {
            title,
            content,
            createdAt: Date.now(),
        }
    );
};

export const getNotes = async () => {
    const user = auth.currentUser;

    if (!user) return [];

    const snapshot = await getDocs(
        collection(db, "users", user.uid, "notes")
    );

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

export const deleteNote = async (id: string) => {
    const user = auth.currentUser;

    if (!user) return;

    await deleteDoc(
        doc(db, "users", user.uid, "notes", id)
    );
};