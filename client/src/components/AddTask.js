import { useState } from "react"
import { HStack, Box, Input, Button } from "native-base"
import { AntDesign } from "@expo/vector-icons"

export default function AddTask({ handleSubmit }) {
  const [value, setValue] = useState(null)

  const onChangeText = (event) => {
    setValue(event)
  }

  const handleAdd = (value) => {
    handleSubmit(value)
    setValue(null)
  }

  return (
    <Box pb={3}>
      <HStack justifyContent="center">
        <Input
          value={value}
          onChangeText={(text) => onChangeText(text)}
          borderRadius={10}
          placeholder="What needs to be done?"
          w={{
            base: "75%",
          }}
          mr={3}
          backgroundColor="white"
          borderColor="white"
        />

        <Button
          backgroundColor="primary.900"
          borderRadius={40}
          onPress={() => handleAdd(value)}
          isDisabled={value ? false : true}
        >
          <AntDesign name="plus" size={24} color="white" />
        </Button>
      </HStack>
    </Box>
  )
}
