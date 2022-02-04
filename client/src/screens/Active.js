import { Box, VStack, FlatList } from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { API } from "../../config/api"
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native"
import { useIsFocused } from "@react-navigation/native"
import { useState, useEffect, useContext } from "react"
import { ListContext } from "../context/listContext"
import EmptyTask from "../../assets/empty.png"

import AddTask from "../components/AddTask"
import Empty from "../components/Empty"
import HeaderApp from "../components/HeaderApp"
import TodoList from "../components/TodoList"

export default function Active() {
  const [data, setData] = useState([])
  const isFocused = useIsFocused()
  const [state, dispatch] = useContext(ListContext)

  const handleAdd = async (value) => {
    try {
      await API.post(`/create/${state.list}`, { value })
      getItems(state.list)
    } catch (error) {
      console.log(error)
    }
  }

  const getItems = async (list) => {
    try {
      let response = await API.get(`/items/${list}`)
      dispatch({ type: "SET_ITEM", payload: response })
      response = response.data.data.listItem.filter(
        (item) => item.done == false
      )
      setData(response)
    } catch (error) {
      console.error(error)
    }
  }
  const handleEditTitle = (name) => {
    dispatch({
      type: "SET_LIST",
      payload: name,
    })
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

  useEffect(async () => {
    checkList()
  }, [isFocused, state.list])

  const handleEditList = async (item, text) => {
    try {
      await API.patch("/item/" + item.id, {
        value: text,
      })
      getItems(state.list)
    } catch (error) {
      console.log(error)
    }
  }

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
        <HeaderApp handleEditTitle={handleEditTitle} />
        {/* <Empty /> */}
        <VStack flex={1} p={5} h="75%">
          <KeyboardAvoidingView style={{ flex: 1 }}>
            {data.length > 0 ? (
              <ScrollView scrollEnabled={true}>
                {data.map((item, index) => {
                  return (
                    <TodoList
                      key={item.id}
                      item={item}
                      handleEditList={handleEditList}
                      handleDeleteList={handleDeleteList}
                      handleIsDoneList={handleIsDoneList}
                    />
                  )
                })}
              </ScrollView>
            ) : (
              <Empty preview={EmptyTask} message={"No Task, Yeay!"} />
            )}
          </KeyboardAvoidingView>
        </VStack>

        <AddTask handleSubmit={handleAdd} />
      </Box>
    </TouchableWithoutFeedback>
  )
}
