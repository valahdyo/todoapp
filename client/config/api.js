import axios from "axios"

export const API = axios.create({
  baseURL: "https://dumb-todolist.herokuapp.com/api/v1/",
})
