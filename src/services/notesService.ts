import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

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
            updatedAt: Date.now(),
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

export const updateNote = async (
    id: string,
    title: string,
    content: string
) => {
    const user = auth.currentUser;

    if (!user) return;

    await updateDoc(
        doc(db, "users", user.uid, "notes", id),
        {
            title,
            content,
            updatedAt: Date.now(),
        }
    );
};