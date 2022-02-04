import { useState, useContext, useEffect } from "react"
import { ListContext } from "../context/listContext"
import { HStack, Text, Box, Input } from "native-base"
import { TouchableOpacity } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function HeaderApp({ handleEditTitle }) {
  const [isEdit, setIsEditing] = useState(false)
  const [state] = useContext(ListContext)
  const [editValue, setEditValue] = useState()
  const [style, setStyle] = useState({})
  const [isInValidInput, setisInValidInput] = useState(false)

  useEffect(async () => {
    try {
      let value = await AsyncStorage.getItem("list")

      if (value !== null) {
        setEditValue(value)
      } else {
        setEditValue("To Do")
      }
    } catch (e) {
      console.log(e)
    }
  }, [state.list])

  const handleOnFocus = () => {
    setStyle({
      backgroundColor: "#FFBCBC",
      color: "black",
      fontWeight: "bold",
      fontSize: 20,
    })
  }

  const handleDoneEdit = (value) => {
    if (editValue.length == 0) {
      setisInValidInput(true)
    } else {
      setIsEditing(false)
      setEditValue(value)
      handleEditTitle(value)
    }
  }

  const handleChange = (text) => {
    setEditValue(text)
  }

  return (
    <Box>
      <HStack padding={5} justifyContent="space-between">
        {handleEditTitle ? (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            {isEdit ? (
              <Input
                onFocus={handleOnFocus}
                borderRadius={10}
                placeholder={isInValidInput == false ? editValue : "Required !"}
                value={editValue}
                autoFocus={true}
                onChangeText={(text) => handleChange(text)}
                onEndEditing={() => handleDoneEdit(editValue)}
                style={style}
                isInvalid={isInValidInput}
                errorBorderColor="yellow"
              />
            ) : (
              <Text fontSize={20} fontWeight={700}>
                {editValue}
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <Text fontSize={20} fontWeight={700}>
            {editValue}
          </Text>
        )}
        <Text fontSize={20} fontWeight={700}>
          {new Date().toLocaleDateString()}
        </Text>
      </HStack>
    </Box>
  )
}
