import AsyncStorage from "@react-native-async-storage/async-storage";

async function setItem(k, v){
    try {
        const jsonV = JSON.stringify(v)
        await AsyncStorage.setItem(k, jsonV)
    } catch (e) {
        
    }
}

async function getItem(k){
    try {
        const jsonV = await AsyncStorage.getItem(k)
        return JSON.parse(jsonV)
    } catch (error) {
        
    }
}

export { setItem, getItem }