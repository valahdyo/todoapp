import { createContext, useReducer } from "react"
import { listReducer } from "./reducers/list"

export const ListContext = createContext()

function ListContextProvider(props) {
  const [state, dispatch] = useReducer(listReducer, {
    list: "To Do",
    item: {},
  })

  return (
    <ListContext.Provider value={[state, dispatch]}>
      {props.children}
    </ListContext.Provider>
  )
}

export default ListContextProvider
