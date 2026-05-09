import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "LOCAL_NOTES";

export const saveLocalNotes = async (notes: any[]) => {
    await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(notes)
    );
};

export const getLocalNotes = async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
};