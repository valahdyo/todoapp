import AsyncStorage from "@react-native-async-storage/async-storage"

export const listReducer = (state, action) => {
  const { type, payload } = action

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("list", value)
    } catch (e) {
      console.log(e)
    }
  }

  switch (type) {
    case "SET_LIST":
      storeData(payload)
      return { list: payload }
    case "SET_ITEM":
      return { ...state, item: payload }
    default:
      return state
  }
}
