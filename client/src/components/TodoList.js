import { VStack, Text, Pressable, HStack, Box, Input } from "native-base"
import { Feather } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { useState } from "react"

export default function TodoList({
  item,
  handleEditList,
  handleDeleteList,
  handleIsDoneList,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(item.value)

  const handleOnEdit = (item) => {
    setIsEditing(true)
  }
  const handleEdit = (text) => {
    setIsEditing(false)
    handleEditList(item, text)
  }

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="primary.900"
      padding={5}
      borderRadius={10}
      mb={3}
    >
      <HStack alignItems="center">
        <Pressable onPress={() => handleIsDoneList(item)}>
          {item.done === false ? (
            <Feather name="circle" size={20} color="midnightblue" />
          ) : (
            <Feather name="check-circle" size={20} color="midnightblue" />
          )}
        </Pressable>
        <VStack ml={3} flex={1}>
          {item.done === false ? (
            <Pressable onPress={() => handleOnEdit(item)}>
              {isEditing ? (
                <Input
                  borderRadius={10}
                  placeholder={item.value}
                  value={editValue}
                  autoFocus={true}
                  onChangeText={(text) => setEditValue(text)}
                  onEndEditing={() => handleEdit(editValue)}
                />
              ) : (
                <Text fontWeight={700}>{item.value}</Text>
              )}
            </Pressable>
          ) : (
            <Text strikeThrough={true} color="warmGray.300" fontWeight={700}>
              {item.value}
            </Text>
          )}

          <Text fontSize={10} color="yellow.200">
            {new Date(item.updatedAt).toDateString()}
          </Text>
        </VStack>
        <VStack>
          <MaterialIcons
            onPress={() => handleDeleteList(item)}
            name="delete"
            size={24}
            color="midnightblue"
          />
        </VStack>
      </HStack>
    </HStack>
  )
}
