import { Box, Text, Image } from "native-base"

export default function Empty({ preview, message }) {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      height={400}
      marginBottom={30}
    >
      <Image alt="empty-icon" source={preview} width={500} height={300} />
      <Text fontSize={25} fontWeight="bold" mt={3} paddingBottom={50}>
        {message}
      </Text>
    </Box>
  )
}
