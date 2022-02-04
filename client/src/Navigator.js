import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { API } from "../config/api"
import { useEffect, useContext, useState } from "react"
import { ListContext } from "./context/listContext"

import Active from "./screens/Active"
import All from "./screens/All"
import Completed from "./screens/Completed"

const Tab = createBottomTabNavigator()
export default function Navigator() {
  const theme = useTheme()

  const [state] = useContext(ListContext)
  const [badges, setBadges] = useState({
    all: 0,
    active: 0,
    completed: 0,
  })

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

  const getItems = async (list) => {
    try {
      let all = 0
      let active = 0
      let completed = 0
      let response = await API.get(`/items/${list}`)
      // all = response.data.data.listItem
      response = response.data.data.listItem.map((item) => {
        all += 1
        if (item.done == false) active += 1
        if (item.done == true) completed += 1
      })

      setBadges({
        all,
        active,
        completed,
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(async () => {
    checkList()
  }, [state])
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Active"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === "Active") {
              iconName = focused ? "ios-chevron-up" : "ios-chevron-up-outline"
            } else if (route.name == "All") {
              iconName = focused ? "ios-list" : "ios-list-outline"
            } else if (route.name == "Completed") {
              iconName = focused ? "ios-archive" : "ios-archive-outline"
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: theme.colors.primary[900],
          tabBarInactiveTintColor: theme.colors.primary[300],
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            paddingTop: 5,
            height: 50,
            paddingBottom: 5,
            backgroundColor: theme.colors.primary["700"],
            borderTopColor: theme.colors.primary["700"],
          },
        })}
      >
        <Tab.Screen
          name="All"
          component={All}
          options={{ tabBarBadge: badges.all }}
        />
        <Tab.Screen
          name="Active"
          component={Active}
          options={{ tabBarBadge: badges.active }}
        />
        <Tab.Screen
          name="Completed"
          component={Completed}
          options={{ tabBarBadge: badges.completed }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
