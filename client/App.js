import Navigator from "./src/Navigator"
import AppLoading from "expo-app-loading"
import ListContextProvider from "./src/context/listContext"
import { NativeBaseProvider, extendTheme } from "native-base"
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat"

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_900Black,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  const fontConfig = {
    Montserrat: {
      400: {
        normal: "Montserrat_400Regular",
      },
      700: {
        normal: "Montserrat_700Bold",
      },
      900: {
        normal: "Monserrat_900Black",
      },
    },
  }
  const fonts = {
    heading: "Montserrat",
    body: "Montserrat",
    mono: "Montserrat",
  }

  const costumeColor = {
    primary: {
      300: "#EDF6E5",
      700: "#FFBCBC",
      900: "#F38BA0",
    },
  }

  const theme = extendTheme({
    colors: costumeColor,
    fontConfig,
    fonts,
    config: { initialColorMode: "light" },
  })
  return (
    <>
      <ListContextProvider>
        <NativeBaseProvider theme={theme}>
          <Navigator />
        </NativeBaseProvider>
      </ListContextProvider>
    </>
  )
}
