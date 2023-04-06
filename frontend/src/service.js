import axios from "axios";

const usersApi = axios.create({
  baseURL: "http://localhost:6001/users",
  timeout: 10000,
})

export const getUsers = async () => {
  const res = await usersApi.get('/')
  return res.data
}

export const updateUser = async (id, body) => {
  const res = await usersApi.put(`/${id}`, body)
  return res;
}

export const deleteUser = async (id) => {
  const res = await usersApi.delete(`/${id}`)
  return res
}

export const updateLike = async (id) => {
  const res = await usersApi.patch(`/like/${id}`)
  return res
}

export const removeLike = async (id) => {
  const res = await usersApi.patch(`/remove-like/${id}`)
  return res
}

export const refreshList = async () => {
  const res = await usersApi.get('/refresh-list')
  return res.data
}

export const IMG_URL = (username) =>
  `https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`
