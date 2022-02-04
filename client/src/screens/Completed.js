import { Box, useTheme, VStack, FlatList } from "native-base"
import { API } from "../../config/api"
import Do from "../../assets/dotask.png"
import AsyncStorage from "@react-native-async-storage/async-storage"

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native"
import { useIsFocused } from "@react-navigation/native"
import { useState, useEffect, useContext } from "react"
import Empty from "../components/Empty"
import HeaderApp from "../components/HeaderApp"
import TodoList from "../components/TodoList"
import { ListContext } from "../context/listContext"

export default function Active() {
  const [data, setData] = useState([])
  const [state, dispatch] = useContext(ListContext)
  const isFocused = useIsFocused()

  const getItems = async (list) => {
    try {
      let response = await API.get(`/items/${list}`)
      dispatch({ type: "SET_ITEM", payload: response })
      response = response.data.data.listItem.filter((item) => item.done == true)
      setData(response)
    } catch (error) {
      console.error(error)
    }
  }

  const checkList = async () => {
    try {
      let value = await AsyncStorage.getItem("list")
      if (value !== null) {
        getItems(value)
      } else {
        getItems("To Do")
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    checkList()
  }, [isFocused])

  const handleDeleteList = async (item) => {
    try {
      await API.delete("/item/" + item.id)
      getItems(state.list)
    } catch (error) {
      console.log(error)
    }
  }

  const handleIsDoneList = async (item) => {
    try {
      await API.patch("/item/" + item.id, {
        done: !item.done,
      })
      getItems(state.list)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box
        justifyContent="flex-end"
        flex={1}
        backgroundColor="primary.700"
        safeAreaTop
      >
        <HeaderApp />
        {/* <Empty /> */}
        <VStack flex={1} p={5} h="75%">
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView scrollEnabled={true}>
              {data.length > 0 ? (
                data.map((item, index) => {
                  return (
                    <TodoList
                      key={item.id}
                      item={item}
                      handleDeleteList={handleDeleteList}
                      handleIsDoneList={handleIsDoneList}
                    />
                  )
                })
              ) : (
                <Empty preview={Do} message={"Do Your Task!"} />
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </VStack>
      </Box>
    </TouchableWithoutFeedback>
  )
}
