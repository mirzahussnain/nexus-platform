import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
const isWeb = Platform.OS === 'web';
export const storage = {
    // Save data (String or Object)
    save: async (key: string, value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            if (key === 'userToken' || key === 'userProfile') {
                if (!isWeb) {
                    await SecureStore.setItemAsync(key, jsonValue);
                }
            } else {
                // For flags like 'hasLaunched', use AsyncStorage
                await AsyncStorage.setItem(key, jsonValue);
            }
        } catch (e) {
            console.error('Storage Save Error:', e);
        }
    },

    // Get data (Auto-parses JSON)
    get: async (key: string) => {
        try {
            let result;
            if (key === 'userToken' || key === 'userProfile') {
                if (!isWeb) {
                    result = await SecureStore.getItemAsync(key);
                }
            } else {
                result = await AsyncStorage.getItem(key);
            }
            return result ? JSON.parse(result) : null;
        } catch (e) {
            console.error('Storage Get Error:', e);
            return null;
        }
    },

    // Delete data
    remove: async (key: string) => {
        try {
            if (key === 'userToken' || key === 'userProfile') {
                if (!isWeb) await SecureStore.deleteItemAsync(key);
            } else {
                await AsyncStorage.removeItem(key);
            }
        } catch (e) {
            console.error('Storage Remove Error:', e);
        }
    },
};